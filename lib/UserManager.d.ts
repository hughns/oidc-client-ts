import { Logger } from "./utils";
import { IFrameNavigator, NavigateResponse, PopupNavigator, RedirectNavigator, PopupWindowParams, IWindow, IFrameWindowParams, RedirectParams } from "./navigators";
import { OidcClient, CreateSigninRequestArgs, CreateSignoutRequestArgs } from "./OidcClient";
import { UserManagerSettings, UserManagerSettingsStore } from "./UserManagerSettings";
import { User } from "./User";
import { UserManagerEvents } from "./UserManagerEvents";
import { SilentRenewService } from "./SilentRenewService";
import { SessionMonitor } from "./SessionMonitor";
import type { SessionStatus } from "./SessionStatus";
import type { SignoutResponse } from "./SignoutResponse";
import type { MetadataService } from "./MetadataService";
import { RefreshState } from "./RefreshState";
import type { DeviceAuthorizationRequestArgs, DeviceAuthorizationResponse } from "./DeviceAuthorizationClient";
/**
 * @public
 */
export declare type ExtraSigninRequestArgs = Pick<CreateSigninRequestArgs, "nonce" | "extraQueryParams" | "extraTokenParams" | "state" | "redirect_uri" | "prompt">;
/**
 * @public
 */
export declare type ExtraSignoutRequestArgs = Pick<CreateSignoutRequestArgs, "extraQueryParams" | "state" | "id_token_hint" | "post_logout_redirect_uri">;
/**
 * @public
 */
export declare type RevokeTokensTypes = UserManagerSettings["revokeTokenTypes"];
/**
 * @public
 */
export declare type SigninRedirectArgs = RedirectParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export declare type SigninPopupArgs = PopupWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export declare type SigninSilentArgs = IFrameWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export declare type QuerySessionStatusArgs = IFrameWindowParams & ExtraSigninRequestArgs;
/**
 * @public
 */
export declare type SignoutRedirectArgs = RedirectParams & ExtraSignoutRequestArgs;
/**
 * @public
 */
export declare type SignoutPopupArgs = PopupWindowParams & ExtraSignoutRequestArgs;
/**
 * Provides a higher level API for signing a user in, signing out, managing the user's claims returned from the OIDC provider,
 * and managing an access token returned from the OIDC/OAuth2 provider.
 *
 * @public
 */
export declare class UserManager {
    /** Returns the settings used to configure the `UserManager`. */
    readonly settings: UserManagerSettingsStore;
    protected readonly _logger: Logger;
    protected readonly _client: OidcClient;
    protected readonly _redirectNavigator: RedirectNavigator;
    protected readonly _popupNavigator: PopupNavigator;
    protected readonly _iframeNavigator: IFrameNavigator;
    protected readonly _events: UserManagerEvents;
    protected readonly _silentRenewService: SilentRenewService;
    protected readonly _sessionMonitor: SessionMonitor | null;
    constructor(settings: UserManagerSettings);
    /** Returns an object used to register for events raised by the `UserManager`. */
    get events(): UserManagerEvents;
    /** Returns an object used to access the metadata configuration of the OIDC provider. */
    get metadataService(): MetadataService;
    /**
     * Returns promise to load the `User` object for the currently authenticated user.
     */
    getUser(): Promise<User | null>;
    /**
     * Returns promise to remove from any storage the currently authenticated user.
     */
    removeUser(): Promise<void>;
    /**
     * Returns promise to trigger a redirect of the current window to the authorization endpoint.
     */
    signinRedirect(args?: SigninRedirectArgs): Promise<void>;
    /**
     * Returns promise to process response from the authorization endpoint. The result of the promise is the authenticated `User`.
     */
    signinRedirectCallback(url?: string): Promise<User>;
    /**
     * Returns promise to trigger a request (via a popup window) to the authorization endpoint. The result of the promise is the authenticated `User`.
     */
    signinPopup(args?: SigninPopupArgs): Promise<User>;
    /**
     * Returns promise to notify the opening window of response from the authorization endpoint.
     */
    signinPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
    /**
     * Returns promise to trigger a silent request (via an iframe) to the authorization endpoint.
     * The result of the promise is the authenticated `User`.
     */
    signinSilent(args?: SigninSilentArgs): Promise<User | null>;
    protected _useRefreshToken(state: RefreshState): Promise<User>;
    /**
     * Returns promise to notify the parent window of response from the authorization endpoint.
     */
    signinSilentCallback(url?: string): Promise<void>;
    signinCallback(url?: string): Promise<User | void>;
    signoutCallback(url?: string, keepOpen?: boolean): Promise<void>;
    /**
     * Returns promise to query OP for user's current signin status. Returns object with session_state and subject identifier.
     */
    querySessionStatus(args?: QuerySessionStatusArgs): Promise<SessionStatus | null>;
    protected _signin(args: CreateSigninRequestArgs, handle: IWindow, verifySub?: string): Promise<User>;
    protected _signinStart(args: CreateSigninRequestArgs, handle: IWindow): Promise<NavigateResponse>;
    protected _signinEnd(url: string, verifySub?: string): Promise<User>;
    /**
     * Returns promise to trigger a redirect of the current window to the end session endpoint.
     */
    signoutRedirect(args?: SignoutRedirectArgs): Promise<void>;
    /**
     * Returns promise to process response from the end session endpoint.
     */
    signoutRedirectCallback(url?: string): Promise<SignoutResponse>;
    /**
     * Returns promise to trigger a redirect of a popup window window to the end session endpoint.
     */
    signoutPopup(args?: SignoutPopupArgs): Promise<void>;
    /**
     * Returns promise to process response from the end session endpoint from a popup window.
     */
    signoutPopupCallback(url?: string, keepOpen?: boolean): Promise<void>;
    protected _signout(args: CreateSignoutRequestArgs, handle: IWindow): Promise<SignoutResponse>;
    protected _signoutStart(args: CreateSignoutRequestArgs | undefined, handle: IWindow): Promise<NavigateResponse>;
    protected _signoutEnd(url: string): Promise<SignoutResponse>;
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