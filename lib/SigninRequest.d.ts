import { SigninState } from "./SigninState";
/**
 * @public
 */
export interface SigninRequestArgs {
    url: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
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
    nonce?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state_data?: unknown;
}
/**
 * @public
 */
export declare class SigninRequest {
    private readonly _logger;
    readonly url: string;
    readonly state: SigninState;
    constructor({ url, authority, client_id, redirect_uri, response_type, scope, state_data, response_mode, request_type, client_secret, nonce, skipUserInfo, extraQueryParams, extraTokenParams, ...optionalParams }: SigninRequestArgs);
}
//# sourceMappingURL=SigninRequest.d.ts.map