import { State } from "./State";
/**
 * @public
 */
export interface SignoutRequestArgs {
    url: string;
    state_data?: unknown;
    id_token_hint?: string;
    post_logout_redirect_uri?: string;
    extraQueryParams?: Record<string, string | number | boolean>;
    request_type?: string;
}
/**
 * @public
 */
export declare class SignoutRequest {
    private readonly _logger;
    readonly url: string;
    readonly state?: State;
    constructor({ url, state_data, id_token_hint, post_logout_redirect_uri, extraQueryParams, request_type, }: SignoutRequestArgs);
}
//# sourceMappingURL=SignoutRequest.d.ts.map