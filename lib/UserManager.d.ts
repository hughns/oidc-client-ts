import { Logger } from "./utils";
import { type NavigateResponse, type PopupWindowParams, type IWindow, type IFrameWindowParams, type RedirectParams, type INavigator } from "./navigators";
import { OidcClient, type CreateSigninRequestArgs, type CreateSignoutRequestArgs, type ProcessResourceOwnerPasswordCredentialsArgs, type UseRefreshTokenArgs } from "./OidcClient";
import { type UserManagerSettings, UserManagerSettingsStore } from "./UserManagerSettings";
import { User } from "./User";
import { UserManagerEvents } from "./UserManagerEvents";
import { SilentRenewService } from "./SilentRenewService";
import { SessionMonitor } from "./SessionMonitor";
import type { SessionStatus } from "./SessionStatus";
import type { SignoutResponse } from "./SignoutResponse";
import type { MetadataService } from "./MetadataService";
import type { SigninResponse } from "./SigninResponse";
import type { DeviceAuthorizationRequestArgs, DeviceAuthorizationResponse } from "./DeviceAuthorizationClient";
/**
 * @public
 */
export type ExtraSigninRequestArgs = Pick<CreateSigninRequestArgs, "nonce" | "extraQueryParams" | "extraTokenParams" | "state" | "redirect_uri" | "prompt" | "acr_values" | "login_hint" | "scope" | "max_age" | "ui_locales" | "resource" | "url_state">;
/**
 * @public
 */
export type ExtraSignoutRequestArgs = Pick<CreateSignoutRequestArgs, "extraQueryParams" | "state" | "id_token_hint" | "post_logout_redirect_uri">;
/**
 * @public
 */
export type RevokeTokensTypes = UserManagerSettings["revokeTokenTypes"];
/**
 * @public
 */
export type SigninRedirectArgs = RedirectParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export type SigninPopupArgs = PopupWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export type SigninSilentArgs = IFrameWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export type SigninResourceOwnerCredentialsArgs = ProcessResourceOwnerPasswordCredentialsArgs;
/**
 * @public
 */
export type QuerySessionStatusArgs = IFrameWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export type SignoutRedirectArgs = RedirectParams & ExtraSignoutRequestArgs;
/**
 * @public
 */
export type SignoutPopupArgs = PopupWindowParams & ExtraSignoutRequestArgs;
/**
 * @public
 */
export type SignoutSilentArgs = IFrameWindowParams & ExtraSignoutRequestArgs;
/**
 * Provides a higher level API for signing a user in, signing out, managing the user's claims returned from the identity provider,
 * and managing an access token returned from the identity provider (OAuth2/OIDC).
 *
 * @public
 */
export declare class UserManager {
    /** Get the settings used to configure the `UserManager`. */
    readonly settings: UserManagerSettingsStore;
    protected readonly _logger: Logger;
    protected readonly _client: OidcClient;
    protected readonly _redirectNavigator: INavigator;
    protected readonly _popupNavigator: INavigator;
    protected readonly _iframeNavigator: INavigator;
    protected readonly _events: UserManagerEvents;
    protected readonly _silentRenewService: SilentRenewService;
    protected readonly _sessionMonitor: SessionMonitor | null;
    constructor(settings: UserManagerSettings, redirectNavigator?: INavigator, popupNavigator?: INavigator, iframeNavigator?: INavigator);
    /**
     * Get object used to register for events raised by the `UserManager`.
     */
    get events(): UserManagerEvents;
    /**
     * Get object used to access the metadata configuration of the identity provider.
     */
    get metadataService(): MetadataService;
    /**
     * Load the `User` object for the currently authenticated user.
     *
     * @returns A promise
     */
    getUser(): Promise<User | null>;
    /**
     * Remove from any storage the currently authenticated user.
     *
     * @returns A promise
     */
    removeUser(): Promise<void>;
    /**
     * Trigger a redirect of the current window to the authorization endpoint.
     *
     * @returns A promise
     *
     * @throws `Error` In cases of wrong authentication.
     */
    signinRedirect(args?: SigninRedirectArgs): Promise<void>;
    /**
     * Process the response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise containing the authenticated `User`.
     *
     * @see {@link UserManager.signinCallback}
     */
    signinRedirectCallback(url?: string): Promise<User>;
    /**
     * Trigger the signin with user/password.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws {@link ErrorResponse} In cases of wrong authentication.
     */
    signinResourceOwnerCredentials({ username, password, skipUserInfo, }: SigninResourceOwnerCredentialsArgs): Promise<User>;
    /**
     * Trigger a request (via a popup window) to the authorization endpoint.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws `Error` In cases of wrong authentication.
     */
    signinPopup(args?: SigninPopupArgs): Promise<User>;
    /**
     * Notify the opening window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
    signinPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
    /**
     * Trigger a silent request (via refresh token or an iframe) to the authorization endpoint.
     *
     * @returns A promise that contains the authenticated `User`.
     */
    signinSilent(args?: SigninSilentArgs): Promise<User | null>;
    protected _useRefreshToken(args: UseRefreshTokenArgs): Promise<User>;
    /**
     *
     * Notify the parent window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
    signinSilentCallback(url?: string): Promise<void>;
    /**
     * Process any response (callback) from the authorization endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signinRedirectCallback}
     * - {@link UserManager.signinPopupCallback}
     * - {@link UserManager.signinSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    signinCallback(url?: string): Promise<User | void>;
    /**
     * Process any response (callback) from the end session endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signoutRedirectCallback}
     * - {@link UserManager.signoutPopupCallback}
     * - {@link UserManager.signoutSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    signoutCallback(url?: string, keepOpen?: boolean): Promise<void>;
    /**
     * Query OP for user's current signin status.
     *
     * @returns A promise object with session_state and subject identifier.
     */
    querySessionStatus(args?: QuerySessionStatusArgs): Promise<SessionStatus | null>;
    protected _signin(args: CreateSigninRequestArgs, handle: IWindow, verifySub?: string): Promise<User>;
    protected _signinStart(args: CreateSigninRequestArgs, handle: IWindow): Promise<NavigateResponse>;
    protected _signinEnd(url: string, verifySub?: string): Promise<User>;
    protected _buildUser(signinResponse: SigninResponse, verifySub?: string): Promise<User>;
    /**
     * Trigger a redirect of the current window to the end session endpoint.
     *
     * @returns A promise
     */
    signoutRedirect(args?: SignoutRedirectArgs): Promise<void>;
    /**
     * Process response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise containing signout response
     *
     * @see {@link UserManager.signoutCallback}
     */
    signoutRedirectCallback(url?: string): Promise<SignoutResponse>;
    /**
     * Trigger a redirect of a popup window window to the end session endpoint.
     *
     * @returns A promise
     */
    signoutPopup(args?: SignoutPopupArgs): Promise<void>;
    /**
     * Process response (callback) from the end session endpoint from a popup window.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    signoutPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
    protected _signout(args: CreateSignoutRequestArgs, handle: IWindow): Promise<SignoutResponse>;
    protected _signoutStart(args: CreateSignoutRequestArgs | undefined, handle: IWindow): Promise<NavigateResponse>;
    protected _signoutEnd(url: string): Promise<SignoutResponse>;
    /**
     * Trigger a silent request (via an iframe) to the end session endpoint.
     *
     * @returns A promise
     */
    signoutSilent(args?: SignoutSilentArgs): Promise<void>;
    /**
     * Notify the parent window of response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    signoutSilentCallback(url?: string): Promise<void>;
    revokeTokens(types?: RevokeTokensTypes): Promise<void>;
    protected _revokeInternal(user: User | null, types?: ("access_token" | "refresh_token")[]): Promise<void>;
    /**
     * Enables silent renew for the `UserManager`.
     */
    startSilentRenew(): void;
    /**
     * Disables silent renew for the `UserManager`.
     */
    stopSilentRenew(): void;
    protected get _userStoreKey(): string;
    protected _loadUser(): Promise<User | null>;
    storeUser(user: User | null): Promise<void>;
    /**
     * Removes stale state entries in storage for incomplete authorize requests.
     */
    clearStaleState(): Promise<void>;
    startDeviceAuthorization(args?: DeviceAuthorizationRequestArgs): Promise<DeviceAuthorizationResponse>;
    waitForDeviceAuthorization(params: DeviceAuthorizationResponse): Promise<Record<string, unknown>>;
}
//# sourceMappingURL=UserManager.d.ts.map