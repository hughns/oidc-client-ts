import { SigninState } from "./SigninState";
/**
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
 */
export interface SigninRequestCreateArgs {
    url: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    response_mode?: "query" | "fragment";
    nonce?: string;
    display?: string;
    prompt?: string;
    max_age?: number;
    ui_locales?: string;
    id_token_hint?: string;
    login_hint?: string;
    acr_values?: string;
    resource?: string | string[];
    request?: string;
    request_uri?: string;
    request_type?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    extraTokenParams?: Record<string, unknown>;
    client_secret?: string;
    skipUserInfo?: boolean;
    disablePKCE?: boolean;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state_data?: unknown;
    url_state?: string;
}
/**
 * @public
 */
export declare class SigninRequest {
    private static readonly _logger;
    readonly url: string;
    readonly state: SigninState;
    private constructor();
    static create({ url, authority, client_id, redirect_uri, response_type, scope, state_data, response_mode, request_type, client_secret, nonce, url_state, resource, skipUserInfo, extraQueryParams, extraTokenParams, disablePKCE, ...optionalParams }: SigninRequestCreateArgs): Promise<SigninRequest>;
}
//# sourceMappingURL=SigninRequest.d.ts.map