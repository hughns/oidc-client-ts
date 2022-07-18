import { Logger } from "./utils";
import { OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import { ResponseValidator } from "./ResponseValidator";
import { MetadataService } from "./MetadataService";
import type { RefreshState } from "./RefreshState";
import { SigninRequest } from "./SigninRequest";
import { SigninResponse } from "./SigninResponse";
import { SignoutRequest, SignoutRequestArgs } from "./SignoutRequest";
import { SignoutResponse } from "./SignoutResponse";
import { SigninState } from "./SigninState";
import { State } from "./State";
import { TokenClient } from "./TokenClient";
import { DeviceAuthorizationClient, DeviceAuthorizationRequestArgs, DeviceAuthorizationResponse } from "./DeviceAuthorizationClient";
/**
 * @public
 */
export interface CreateSigninRequestArgs {
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
    nonce?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state?: unknown;
    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    id_token_hint?: string;
    login_hint?: string;
    acr_values?: string;
    resource?: string;
    response_mode?: "query" | "fragment";
    request?: string;
    request_uri?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    request_type?: string;
    client_secret?: string;
    extraTokenParams?: Record<string, unknown>;
    skipUserInfo?: boolean;
}
/**
 * @public
 */
export interface UseRefreshTokenArgs {
    state: RefreshState;
    timeoutInSeconds?: number;
}
/**
 * @public
 */
export declare type CreateSignoutRequestArgs = Omit<SignoutRequestArgs, "url" | "state_data"> & {
    state?: unknown;
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
    protected readonly _validator: ResponseValidator;
    protected readonly _tokenClient: TokenClient;
    protected readonly _deviceAuthorizationClient: DeviceAuthorizationClient;
    constructor(settings: OidcClientSettings);
    createSigninRequest({ state, request, request_uri, request_type, id_token_hint, login_hint, skipUserInfo, nonce, response_type, scope, redirect_uri, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, extraQueryParams, extraTokenParams, }: CreateSigninRequestArgs): Promise<SigninRequest>;
    readSigninResponseState(url: string, removeState?: boolean): Promise<{
        state: SigninState;
        response: SigninResponse;
    }>;
    processSigninResponse(url: string): Promise<SigninResponse>;
    useRefreshToken({ state, timeoutInSeconds, }: UseRefreshTokenArgs): Promise<SigninResponse>;
    createSignoutRequest({ state, id_token_hint, request_type, post_logout_redirect_uri, extraQueryParams, }?: CreateSignoutRequestArgs): Promise<SignoutRequest>;
    readSignoutResponseState(url: string, removeState?: boolean): Promise<{
        state: State | undefined;
        response: SignoutResponse;
    }>;
    processSignoutResponse(url: string): Promise<SignoutResponse>;
    clearStaleState(): Promise<void>;
    revokeToken(token: string, type?: "access_token" | "refresh_token"): Promise<void>;
    startDeviceAuthorization(args: DeviceAuthorizationRequestArgs): Promise<DeviceAuthorizationResponse>;
    waitForDeviceAuthorization(params: DeviceAuthorizationResponse): Promise<Record<string, unknown>>;
}
//# sourceMappingURL=OidcClient.d.ts.map