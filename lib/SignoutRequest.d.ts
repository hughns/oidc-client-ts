import { State } from "./State";
/**
 * @public
 * @see https://openid.net/specs/openid-connect-rpinitiated-1_0.html#RPLogout
 */
export interface SignoutRequestArgs {
    url: string;
    id_token_hint?: string;
    client_id?: string;
    post_logout_redirect_uri?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    request_type?: string;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    state_data?: unknown;
}
/**
 * @public
 */
export declare class SignoutRequest {
    private readonly _logger;
    readonly url: string;
    readonly state?: State;
    constructor({ url, state_data, id_token_hint, post_logout_redirect_uri, extraQueryParams, request_type, client_id, }: SignoutRequestArgs);
}
//# sourceMappingURL=SignoutRequest.d.ts.map