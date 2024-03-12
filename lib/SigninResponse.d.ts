import type { UserProfile } from "./User";
/**
 * @public
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthResponse
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 */
export declare class SigninResponse {
    readonly state: string | null;
    /** @see {@link User.session_state} */
    session_state: string | null;
    /** @see {@link ErrorResponse.error} */
    readonly error: string | null;
    /** @see {@link ErrorResponse.error_description} */
    readonly error_description: string | null;
    /** @see {@link ErrorResponse.error_uri} */
    readonly error_uri: string | null;
    readonly code: string | null;
    /** @see {@link User.id_token} */
    id_token?: string;
    /** @see {@link User.access_token} */
    access_token: string;
    /** @see {@link User.token_type} */
    token_type: string;
    /** @see {@link User.refresh_token} */
    refresh_token?: string;
    /** @see {@link User.scope} */
    scope?: string;
    /** @see {@link User.expires_at} */
    expires_at?: number;
    /** custom state data set during the initial signin request */
    userState: unknown;
    url_state?: string;
    /** @see {@link User.profile} */
    profile: UserProfile;
    constructor(params: URLSearchParams);
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    get isOpenId(): boolean;
}
//# sourceMappingURL=SigninResponse.d.ts.map