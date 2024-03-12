import type { IdTokenClaims } from "./Claims";
/**
 * Holds claims represented by a combination of the `id_token` and the user info endpoint.
 *
 * @public
 */
export type UserProfile = IdTokenClaims;
/**
 * @public
 */
export declare class User {
    /**
     * A JSON Web Token (JWT). Only provided if `openid` scope was requested.
     * The application can access the data decoded by using the `profile` property.
     */
    id_token?: string;
    /** The session state value returned from the OIDC provider. */
    session_state: string | null;
    /**
     * The requested access token returned from the OIDC provider. The application can use this token to
     * authenticate itself to the secured resource.
     */
    access_token: string;
    /**
     * An OAuth 2.0 refresh token. The app can use this token to acquire additional access tokens after the
     * current access token expires. Refresh tokens are long-lived and can be used to maintain access to resources
     * for extended periods of time.
     */
    refresh_token?: string;
    /** Typically "Bearer" */
    token_type: string;
    /** The scopes that the requested access token is valid for. */
    scope?: string;
    /** The claims represented by a combination of the `id_token` and the user info endpoint. */
    profile: UserProfile;
    /** The expires at returned from the OIDC provider. */
    expires_at?: number;
    /** custom state data set during the initial signin request */
    readonly state: unknown;
    readonly url_state?: string;
    constructor(args: {
        id_token?: string;
        session_state?: string | null;
        access_token: string;
        refresh_token?: string;
        token_type: string;
        scope?: string;
        profile: UserProfile;
        expires_at?: number;
        userState?: unknown;
        url_state?: string;
    });
    /** Computed number of seconds the access token has remaining. */
    get expires_in(): number | undefined;
    set expires_in(value: number | undefined);
    /** Computed value indicating if the access token is expired. */
    get expired(): boolean | undefined;
    /** Array representing the parsed values from the `scope`. */
    get scopes(): string[];
    toStorageString(): string;
    static fromStorageString(storageString: string): User;
}
//# sourceMappingURL=User.d.ts.map