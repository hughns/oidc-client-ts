// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { JwtUtils, Logger } from "./utils";
import { ErrorResponse } from "./errors";
import {
    type NavigateResponse,
    type PopupWindowParams,
    type IWindow,
    type IFrameWindowParams,
    type RedirectParams,
    RedirectNavigator,
    PopupNavigator,
    IFrameNavigator,
    type INavigator,
} from "./navigators";
import {
    OidcClient,
    type CreateSigninRequestArgs,
    type CreateSignoutRequestArgs,
    type ProcessResourceOwnerPasswordCredentialsArgs,
    type UseRefreshTokenArgs,
} from "./OidcClient";
import {
    type UserManagerSettings,
    UserManagerSettingsStore,
} from "./UserManagerSettings";
import { User, type UserProfile } from "./User";
import { UserManagerEvents } from "./UserManagerEvents";
import { SilentRenewService } from "./SilentRenewService";
import { SessionMonitor } from "./SessionMonitor";
import type { SessionStatus } from "./SessionStatus";
import type { SignoutResponse } from "./SignoutResponse";
import type { MetadataService } from "./MetadataService";
import { RefreshState } from "./RefreshState";
import type { SigninResponse } from "./SigninResponse";
import type {
    DeviceAuthorizationRequestArgs,
    DeviceAuthorizationResponse,
} from "./DeviceAuthorizationClient";

/**
 * @public
 */
export type ExtraSigninRequestArgs = Pick<
CreateSigninRequestArgs,
| "nonce"
| "extraQueryParams"
| "extraTokenParams"
| "state"
| "redirect_uri"
| "prompt"
| "acr_values"
| "login_hint"
| "scope"
| "max_age"
| "ui_locales"
| "resource"
| "url_state"
>;
/**
 * @public
 */
export type ExtraSignoutRequestArgs = Pick<
CreateSignoutRequestArgs,
"extraQueryParams" | "state" | "id_token_hint" | "post_logout_redirect_uri"
>;

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
export type SigninResourceOwnerCredentialsArgs =
    ProcessResourceOwnerPasswordCredentialsArgs;

/**
 * @public
 */
export type QuerySessionStatusArgs = IFrameWindowParams &
ExtraSigninRequestArgs;

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
export class UserManager {
    /** Get the settings used to configure the `UserManager`. */
    public readonly settings: UserManagerSettingsStore;
    protected readonly _logger = new Logger("UserManager");

    protected readonly _client: OidcClient;
    protected readonly _redirectNavigator: INavigator;
    protected readonly _popupNavigator: INavigator;
    protected readonly _iframeNavigator: INavigator;
    protected readonly _events: UserManagerEvents;
    protected readonly _silentRenewService: SilentRenewService;
    protected readonly _sessionMonitor: SessionMonitor | null;

    public constructor(
        settings: UserManagerSettings,
        redirectNavigator?: INavigator,
        popupNavigator?: INavigator,
        iframeNavigator?: INavigator,
    ) {
        this.settings = new UserManagerSettingsStore(settings);

        this._client = new OidcClient(settings);

        this._redirectNavigator =
            redirectNavigator ?? new RedirectNavigator(this.settings);
        this._popupNavigator =
            popupNavigator ?? new PopupNavigator(this.settings);
        this._iframeNavigator =
            iframeNavigator ?? new IFrameNavigator(this.settings);

        this._events = new UserManagerEvents(this.settings);
        this._silentRenewService = new SilentRenewService(this);

        // order is important for the following properties; these services depend upon the events.
        if (this.settings.automaticSilentRenew) {
            this.startSilentRenew();
        }

        this._sessionMonitor = null;
        if (this.settings.monitorSession) {
            this._sessionMonitor = new SessionMonitor(this);
        }
    }

    /**
     * Get object used to register for events raised by the `UserManager`.
     */
    public get events(): UserManagerEvents {
        return this._events;
    }

    /**
     * Get object used to access the metadata configuration of the identity provider.
     */
    public get metadataService(): MetadataService {
        return this._client.metadataService;
    }

    /**
     * Load the `User` object for the currently authenticated user.
     *
     * @returns A promise
     */
    public async getUser(): Promise<User | null> {
        const logger = this._logger.create("getUser");
        const user = await this._loadUser();
        if (user) {
            logger.info("user loaded");
            await this._events.load(user, false);
            return user;
        }

        logger.info("user not found in storage");
        return null;
    }

    /**
     * Remove from any storage the currently authenticated user.
     *
     * @returns A promise
     */
    public async removeUser(): Promise<void> {
        const logger = this._logger.create("removeUser");
        await this.storeUser(null);
        logger.info("user removed from storage");
        await this._events.unload();
    }

    /**
     * Trigger a redirect of the current window to the authorization endpoint.
     *
     * @returns A promise
     *
     * @throws `Error` In cases of wrong authentication.
     */
    public async signinRedirect(args: SigninRedirectArgs = {}): Promise<void> {
        this._logger.create("signinRedirect");
        const { redirectMethod, ...requestArgs } = args;
        const handle = await this._redirectNavigator.prepare({
            redirectMethod,
        });
        await this._signinStart(
            {
                request_type: "si:r",
                ...requestArgs,
            },
            handle,
        );
    }

    /**
     * Process the response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise containing the authenticated `User`.
     *
     * @see {@link UserManager.signinCallback}
     */
    public async signinRedirectCallback(
        url = window.location.href,
    ): Promise<User> {
        const logger = this._logger.create("signinRedirectCallback");
        const user = await this._signinEnd(url);
        if (user.profile && user.profile.sub) {
            logger.info("success, signed in subject", user.profile.sub);
        } else {
            logger.info("no subject");
        }

        return user;
    }

    /**
     * Trigger the signin with user/password.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws {@link ErrorResponse} In cases of wrong authentication.
     */
    public async signinResourceOwnerCredentials({
        username,
        password,
        skipUserInfo = false,
    }: SigninResourceOwnerCredentialsArgs): Promise<User> {
        const logger = this._logger.create("signinResourceOwnerCredential");

        const signinResponse =
            await this._client.processResourceOwnerPasswordCredentials({
                username,
                password,
                skipUserInfo,
                extraTokenParams: this.settings.extraTokenParams,
            });
        logger.debug("got signin response");

        const user = await this._buildUser(signinResponse);
        if (user.profile && user.profile.sub) {
            logger.info("success, signed in subject", user.profile.sub);
        } else {
            logger.info("no subject");
        }
        return user;
    }

    /**
     * Trigger a request (via a popup window) to the authorization endpoint.
     *
     * @returns A promise containing the authenticated `User`.
     * @throws `Error` In cases of wrong authentication.
     */
    public async signinPopup(args: SigninPopupArgs = {}): Promise<User> {
        const logger = this._logger.create("signinPopup");
        const { popupWindowFeatures, popupWindowTarget, ...requestArgs } = args;
        const url = this.settings.popup_redirect_uri;
        if (!url) {
            logger.throw(new Error("No popup_redirect_uri configured"));
        }

        const handle = await this._popupNavigator.prepare({
            popupWindowFeatures,
            popupWindowTarget,
        });
        const user = await this._signin(
            {
                request_type: "si:p",
                redirect_uri: url,
                display: "popup",
                ...requestArgs,
            },
            handle,
        );
        if (user) {
            if (user.profile && user.profile.sub) {
                logger.info("success, signed in subject", user.profile.sub);
            } else {
                logger.info("no subject");
            }
        }

        return user;
    }
    /**
     * Notify the opening window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
    public async signinPopupCallback(
        url = window.location.href,
        keepOpen = false,
    ): Promise<void> {
        const logger = this._logger.create("signinPopupCallback");
        await this._popupNavigator.callback(url, { keepOpen });
        logger.info("success");
    }

    /**
     * Trigger a silent request (via refresh token or an iframe) to the authorization endpoint.
     *
     * @returns A promise that contains the authenticated `User`.
     */
    public async signinSilent(
        args: SigninSilentArgs = {},
    ): Promise<User | null> {
        const logger = this._logger.create("signinSilent");
        const { silentRequestTimeoutInSeconds, ...requestArgs } = args;
        // first determine if we have a refresh token, or need to use iframe
        let user = await this._loadUser();
        if (user?.refresh_token) {
            logger.debug("using refresh token");
            const state = new RefreshState(user as Required<User>);
            return await this._useRefreshToken({
                state,
                redirect_uri: requestArgs.redirect_uri,
                resource: requestArgs.resource,
                extraTokenParams: requestArgs.extraTokenParams,
                timeoutInSeconds: silentRequestTimeoutInSeconds,
            });
        }

        const url = this.settings.silent_redirect_uri;
        if (!url) {
            logger.throw(new Error("No silent_redirect_uri configured"));
        }

        let verifySub: string | undefined;
        if (user && this.settings.validateSubOnSilentRenew) {
            logger.debug("subject prior to silent renew:", user.profile.sub);
            verifySub = user.profile.sub;
        }

        const handle = await this._iframeNavigator.prepare({
            silentRequestTimeoutInSeconds,
        });
        user = await this._signin(
            {
                request_type: "si:s",
                redirect_uri: url,
                prompt: "none",
                id_token_hint: this.settings.includeIdTokenInSilentRenew
                    ? user?.id_token
                    : undefined,
                ...requestArgs,
            },
            handle,
            verifySub,
        );
        if (user) {
            if (user.profile?.sub) {
                logger.info("success, signed in subject", user.profile.sub);
            } else {
                logger.info("no subject");
            }
        }

        return user;
    }

    protected async _useRefreshToken(args: UseRefreshTokenArgs): Promise<User> {
        const response = await this._client.useRefreshToken({
            ...args,
            timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds,
        });
        const user = new User({ ...args.state, ...response });

        await this.storeUser(user);
        await this._events.load(user);
        return user;
    }

    /**
     *
     * Notify the parent window of response (callback) from the authorization endpoint.
     * It is recommend to use {@link UserManager.signinCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signinCallback}
     */
    public async signinSilentCallback(
        url = window.location.href,
    ): Promise<void> {
        const logger = this._logger.create("signinSilentCallback");
        await this._iframeNavigator.callback(url);
        logger.info("success");
    }

    /**
     * Process any response (callback) from the authorization endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signinRedirectCallback}
     * - {@link UserManager.signinPopupCallback}
     * - {@link UserManager.signinSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    public async signinCallback(
        url = window.location.href,
    ): Promise<User | void> {
        const { state } = await this._client.readSigninResponseState(url);
        switch (state.request_type) {
            case "si:r":
                return await this.signinRedirectCallback(url);
            case "si:p":
                return await this.signinPopupCallback(url);
            case "si:s":
                return await this.signinSilentCallback(url);
            default:
                throw new Error("invalid response_type in state");
        }
    }

    /**
     * Process any response (callback) from the end session endpoint, by dispatching the request_type
     * and executing one of the following functions:
     * - {@link UserManager.signoutRedirectCallback}
     * - {@link UserManager.signoutPopupCallback}
     * - {@link UserManager.signoutSilentCallback}
     *
     * @throws `Error` If request_type is unknown or signout can not processed.
     */
    public async signoutCallback(
        url = window.location.href,
        keepOpen = false,
    ): Promise<void> {
        const { state } = await this._client.readSignoutResponseState(url);
        if (!state) {
            return;
        }

        switch (state.request_type) {
            case "so:r":
                await this.signoutRedirectCallback(url);
                break;
            case "so:p":
                await this.signoutPopupCallback(url, keepOpen);
                break;
            case "so:s":
                await this.signoutSilentCallback(url);
                break;
            default:
                throw new Error("invalid response_type in state");
        }
    }

    /**
     * Query OP for user's current signin status.
     *
     * @returns A promise object with session_state and subject identifier.
     */
    public async querySessionStatus(
        args: QuerySessionStatusArgs = {},
    ): Promise<SessionStatus | null> {
        const logger = this._logger.create("querySessionStatus");
        const { silentRequestTimeoutInSeconds, ...requestArgs } = args;
        const url = this.settings.silent_redirect_uri;
        if (!url) {
            logger.throw(new Error("No silent_redirect_uri configured"));
        }

        const user = await this._loadUser();
        const handle = await this._iframeNavigator.prepare({
            silentRequestTimeoutInSeconds,
        });
        const navResponse = await this._signinStart(
            {
                request_type: "si:s", // this acts like a signin silent
                redirect_uri: url,
                prompt: "none",
                id_token_hint: this.settings.includeIdTokenInSilentRenew
                    ? user?.id_token
                    : undefined,
                response_type: this.settings.query_status_response_type,
                scope: "openid",
                skipUserInfo: true,
                ...requestArgs,
            },
            handle,
        );
        try {
            const signinResponse = await this._client.processSigninResponse(
                navResponse.url,
            );
            logger.debug("got signin response");

            if (signinResponse.session_state && signinResponse.profile.sub) {
                logger.info("success for subject", signinResponse.profile.sub);
                return {
                    session_state: signinResponse.session_state,
                    sub: signinResponse.profile.sub,
                };
            }

            logger.info("success, user not authenticated");
            return null;
        } catch (err) {
            if (
                this.settings.monitorAnonymousSession &&
                err instanceof ErrorResponse
            ) {
                switch (err.error) {
                    case "login_required":
                    case "consent_required":
                    case "interaction_required":
                    case "account_selection_required":
                        logger.info("success for anonymous user");
                        return {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            session_state: err.session_state!,
                        };
                }
            }
            throw err;
        }
    }

    protected async _signin(
        args: CreateSigninRequestArgs,
        handle: IWindow,
        verifySub?: string,
    ): Promise<User> {
        const navResponse = await this._signinStart(args, handle);
        return await this._signinEnd(navResponse.url, verifySub);
    }
    protected async _signinStart(
        args: CreateSigninRequestArgs,
        handle: IWindow,
    ): Promise<NavigateResponse> {
        const logger = this._logger.create("_signinStart");

        try {
            const signinRequest = await this._client.createSigninRequest(args);
            logger.debug("got signin request");

            return await handle.navigate({
                url: signinRequest.url,
                state: signinRequest.state.id,
                response_mode: signinRequest.state.response_mode,
                scriptOrigin: this.settings.iframeScriptOrigin,
            });
        } catch (err) {
            logger.debug(
                "error after preparing navigator, closing navigator window",
            );
            handle.close();
            throw err;
        }
    }
    protected async _signinEnd(url: string, verifySub?: string): Promise<User> {
        const logger = this._logger.create("_signinEnd");
        const signinResponse = await this._client.processSigninResponse(url);
        logger.debug("got signin response");

        const user = await this._buildUser(signinResponse, verifySub);
        return user;
    }

    protected async _buildUser(
        signinResponse: SigninResponse,
        verifySub?: string,
    ) {
        const logger = this._logger.create("_buildUser");
        const user = new User(signinResponse);
        if (verifySub) {
            if (verifySub !== user.profile.sub) {
                logger.debug(
                    "current user does not match user returned from signin. sub from signin:",
                    user.profile.sub,
                );
                throw new ErrorResponse({
                    ...signinResponse,
                    error: "login_required",
                });
            }
            logger.debug("current user matches user returned from signin");
        }

        await this.storeUser(user);
        logger.debug("user stored");
        await this._events.load(user);

        return user;
    }

    /**
     * Trigger a redirect of the current window to the end session endpoint.
     *
     * @returns A promise
     */
    public async signoutRedirect(
        args: SignoutRedirectArgs = {},
    ): Promise<void> {
        const logger = this._logger.create("signoutRedirect");
        const { redirectMethod, ...requestArgs } = args;
        const handle = await this._redirectNavigator.prepare({
            redirectMethod,
        });
        await this._signoutStart(
            {
                request_type: "so:r",
                post_logout_redirect_uri:
                    this.settings.post_logout_redirect_uri,
                ...requestArgs,
            },
            handle,
        );
        logger.info("success");
    }

    /**
     * Process response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise containing signout response
     *
     * @see {@link UserManager.signoutCallback}
     */
    public async signoutRedirectCallback(
        url = window.location.href,
    ): Promise<SignoutResponse> {
        const logger = this._logger.create("signoutRedirectCallback");
        const response = await this._signoutEnd(url);
        logger.info("success");
        return response;
    }

    /**
     * Trigger a redirect of a popup window window to the end session endpoint.
     *
     * @returns A promise
     */
    public async signoutPopup(args: SignoutPopupArgs = {}): Promise<void> {
        const logger = this._logger.create("signoutPopup");
        const { popupWindowFeatures, popupWindowTarget, ...requestArgs } = args;
        const url = this.settings.popup_post_logout_redirect_uri;

        const handle = await this._popupNavigator.prepare({
            popupWindowFeatures,
            popupWindowTarget,
        });
        await this._signout(
            {
                request_type: "so:p",
                post_logout_redirect_uri: url,
                // we're putting a dummy entry in here because we
                // need a unique id from the state for notification
                // to the parent window, which is necessary if we
                // plan to return back to the client after signout
                // and so we can close the popup after signout
                state: url == null ? undefined : {},
                ...requestArgs,
            },
            handle,
        );
        logger.info("success");
    }

    /**
     * Process response (callback) from the end session endpoint from a popup window.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    public async signoutPopupCallback(
        url = window.location.href,
        keepOpen = false,
    ): Promise<void> {
        const logger = this._logger.create("signoutPopupCallback");
        await this._popupNavigator.callback(url, { keepOpen });
        logger.info("success");
    }

    protected async _signout(
        args: CreateSignoutRequestArgs,
        handle: IWindow,
    ): Promise<SignoutResponse> {
        const navResponse = await this._signoutStart(args, handle);
        return await this._signoutEnd(navResponse.url);
    }
    protected async _signoutStart(
        args: CreateSignoutRequestArgs = {},
        handle: IWindow,
    ): Promise<NavigateResponse> {
        const logger = this._logger.create("_signoutStart");

        try {
            const user = await this._loadUser();
            logger.debug("loaded current user from storage");

            if (this.settings.revokeTokensOnSignout) {
                await this._revokeInternal(user);
            }

            const id_token = args.id_token_hint || (user && user.id_token);
            if (id_token) {
                logger.debug("setting id_token_hint in signout request");
                args.id_token_hint = id_token;
            }

            await this.removeUser();
            logger.debug("user removed, creating signout request");

            const signoutRequest = await this._client.createSignoutRequest(
                args,
            );
            logger.debug("got signout request");

            return await handle.navigate({
                url: signoutRequest.url,
                state: signoutRequest.state?.id,
                scriptOrigin: this.settings.iframeScriptOrigin,
            });
        } catch (err) {
            logger.debug(
                "error after preparing navigator, closing navigator window",
            );
            handle.close();
            throw err;
        }
    }
    protected async _signoutEnd(url: string): Promise<SignoutResponse> {
        const logger = this._logger.create("_signoutEnd");
        const signoutResponse = await this._client.processSignoutResponse(url);
        logger.debug("got signout response");

        return signoutResponse;
    }

    /**
     * Trigger a silent request (via an iframe) to the end session endpoint.
     *
     * @returns A promise
     */
    public async signoutSilent(args: SignoutSilentArgs = {}): Promise<void> {
        const logger = this._logger.create("signoutSilent");
        const { silentRequestTimeoutInSeconds, ...requestArgs } = args;

        const id_token_hint = this.settings.includeIdTokenInSilentSignout
            ? (await this._loadUser())?.id_token
            : undefined;

        const url = this.settings.popup_post_logout_redirect_uri;
        const handle = await this._iframeNavigator.prepare({
            silentRequestTimeoutInSeconds,
        });
        await this._signout(
            {
                request_type: "so:s",
                post_logout_redirect_uri: url,
                id_token_hint: id_token_hint,
                ...requestArgs,
            },
            handle,
        );

        logger.info("success");
    }

    /**
     * Notify the parent window of response (callback) from the end session endpoint.
     * It is recommend to use {@link UserManager.signoutCallback} instead.
     *
     * @returns A promise
     *
     * @see {@link UserManager.signoutCallback}
     */
    public async signoutSilentCallback(
        url = window.location.href,
    ): Promise<void> {
        const logger = this._logger.create("signoutSilentCallback");
        await this._iframeNavigator.callback(url);
        logger.info("success");
    }

    public async revokeTokens(types?: RevokeTokensTypes): Promise<void> {
        const user = await this._loadUser();
        await this._revokeInternal(user, types);
    }

    protected async _revokeInternal(
        user: User | null,
        types = this.settings.revokeTokenTypes,
    ): Promise<void> {
        const logger = this._logger.create("_revokeInternal");
        if (!user) return;

        const typesPresent = types.filter(
            (type) => typeof user[type] === "string",
        );

        if (!typesPresent.length) {
            logger.debug("no need to revoke due to no token(s)");
            return;
        }

        // don't Promise.all, order matters
        for (const type of typesPresent) {
            await this._client.revokeToken(
                user[type]!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                type,
            );
            logger.info(`${type} revoked successfully`);
            if (type !== "access_token") {
                user[type] = null as never;
            }
        }

        await this.storeUser(user);
        logger.debug("user stored");
        await this._events.load(user);
    }

    /**
     * Enables silent renew for the `UserManager`.
     */
    public startSilentRenew(): void {
        this._logger.create("startSilentRenew");
        void this._silentRenewService.start();
    }

    /**
     * Disables silent renew for the `UserManager`.
     */
    public stopSilentRenew(): void {
        this._silentRenewService.stop();
    }

    protected get _userStoreKey(): string {
        return `user:${this.settings.authority}:${this.settings.client_id}`;
    }

    protected async _loadUser(): Promise<User | null> {
        const logger = this._logger.create("_loadUser");
        const storageString = await this.settings.userStore.get(
            this._userStoreKey,
        );
        if (storageString) {
            logger.debug("user storageString loaded");
            return User.fromStorageString(storageString);
        }

        logger.debug("no user storageString");
        return null;
    }

    public async storeUser(user: User | null): Promise<void> {
        const logger = this._logger.create("storeUser");
        if (user) {
            logger.debug("storing user");
            const storageString = user.toStorageString();
            await this.settings.userStore.set(
                this._userStoreKey,
                storageString,
            );
        } else {
            this._logger.debug("removing user");
            await this.settings.userStore.remove(this._userStoreKey);
        }
    }

    /**
     * Removes stale state entries in storage for incomplete authorize requests.
     */
    public async clearStaleState(): Promise<void> {
        await this._client.clearStaleState();
    }

    public async startDeviceAuthorization(
        args?: DeviceAuthorizationRequestArgs,
    ): Promise<DeviceAuthorizationResponse> {
        return await this._client.startDeviceAuthorization(args ?? {});
    }

    public async waitForDeviceAuthorization(
        params: DeviceAuthorizationResponse,
    ): Promise<Record<string, unknown>> {
        const res = await this._client.waitForDeviceAuthorization(params);
        if (res.access_token) {
            const profile = JwtUtils.decode(
                (res.id_token as string) ?? "",
            ) as UserProfile;
            const user = new User({
                profile,
                access_token: res.access_token as string,
                token_type: res.token_type as string,
                id_token: res.id_token as string | undefined,
                refresh_token: res.refresh_token as string | undefined,
                scope: res.scope as string | undefined,
                session_state: res.session_state as string | undefined,
            });
            if (typeof res.expires_in === "number") {
                user.expires_in = res.expires_in;
            }
            await this.storeUser(user);
            await this._events.load(user);
        }
        return res;
    }
}
