import { Logger } from "./utils";
import { type OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import { ResponseValidator } from "./ResponseValidator";
import { MetadataService } from "./MetadataService";
import type { RefreshState } from "./RefreshState";
import { SigninRequest, type SigninRequestCreateArgs } from "./SigninRequest";
import { SigninResponse } from "./SigninResponse";
import { SignoutRequest, type SignoutRequestArgs } from "./SignoutRequest";
import { SignoutResponse } from "./SignoutResponse";
import { SigninState } from "./SigninState";
import { State } from "./State";
import { TokenClient } from "./TokenClient";
import { ClaimsService } from "./ClaimsService";
import { DeviceAuthorizationClient } from "./DeviceAuthorizationClient";
import type { DeviceAccessTokenError, DeviceAccessTokenResponse, DeviceAuthorizationRequestArgs, DeviceAuthorizationResponse } from "./DeviceAuthorizationClient";
/**
 * @public
 */
export interface CreateSigninRequestArgs extends Omit<SigninRequestCreateArgs, "url" | "authority" | "client_id" | "redirect_uri" | "response_type" | "scope" | "state_data"> {
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state?: unknown;
}
/**
 * @public
 */
export interface UseRefreshTokenArgs {
    redirect_uri?: string;
    resource?: string | string[];
    extraTokenParams?: Record<string, unknown>;
    timeoutInSeconds?: number;
    state: RefreshState;
}
/**
 * @public
 */
export type CreateSignoutRequestArgs = Omit<SignoutRequestArgs, "url" | "state_data"> & {
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state?: unknown;
};
/**
 * @public
 */
export type ProcessResourceOwnerPasswordCredentialsArgs = {
    username: string;
    password: string;
    skipUserInfo?: boolean;
    extraTokenParams?: Record<string, unknown>;
};
/**
 * Provides the raw OIDC/OAuth2 protocol support for the authorization endpoint and the end session endpoint in the
 * authorization server. It provides a bare-bones protocol implementation and is used by the UserManager class.
 * Only use this class if you simply want protocol support without the additional management features of the
 * UserManager class.
 *
 * @public
 */
export declare class OidcClient {
    readonly settings: OidcClientSettingsStore;
    protected readonly _logger: Logger;
    readonly metadataService: MetadataService;
    protected readonly _claimsService: ClaimsService;
    protected readonly _validator: ResponseValidator;
    protected readonly _tokenClient: TokenClient;
    protected readonly _deviceAuthorizationClient: DeviceAuthorizationClient;
    constructor(settings: OidcClientSettings);
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    createSigninRequest({ state, request, request_uri, request_type, id_token_hint, login_hint, skipUserInfo, nonce, url_state, response_type, scope, redirect_uri, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, extraQueryParams, extraTokenParams, }: CreateSigninRequestArgs): Promise<SigninRequest>;
    readSigninResponseState(url: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string): Promise<SigninResponse>;
    processResourceOwnerPasswordCredentials({ username, password, skipUserInfo, extraTokenParams, }: ProcessResourceOwnerPasswordCredentialsArgs): Promise<SigninResponse>;
    useRefreshToken({ state, redirect_uri, resource, timeoutInSeconds, extraTokenParams, }: UseRefreshTokenArgs): Promise<SigninResponse>;
    createSignoutRequest({ state, id_token_hint, client_id, request_type, post_logout_redirect_uri, extraQueryParams, }?: CreateSignoutRequestArgs): Promise<SignoutRequest>;
    readSignoutResponseState(url: string, removeState?: boolean): Promise<{
        state: State | undefined;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
    revokeToken(token: string, type?: "access_token" | "refresh_token"): Promise<void>;
    startDeviceAuthorization(args: DeviceAuthorizationRequestArgs): Promise<DeviceAuthorizationResponse>;
    waitForDeviceAuthorization(params: DeviceAuthorizationResponse): Promise<DeviceAccessTokenResponse | DeviceAccessTokenError>;
}
//# sourceMappingURL=OidcClient.d.ts.map