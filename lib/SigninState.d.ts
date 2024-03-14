import { State } from "./State";
/** @public */
export interface SigninStateArgs {
    id?: string;
    data?: unknown;
    created?: number;
    request_type?: string;
    code_verifier?: string;
    code_challenge?: string;
    authority: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    client_secret?: string;
    extraTokenParams?: Record<string, unknown>;
    response_mode?: "query" | "fragment";
    skipUserInfo?: boolean;
    url_state?: string;
}
/** @public */
export type SigninStateCreateArgs = Omit<SigninStateArgs, "code_verifier"> & {
    code_verifier?: string | boolean;
};
/**
 * @public
 */
export declare class SigninState extends State {
    /** The same code_verifier that was used to obtain the authorization_code via PKCE. */
    readonly code_verifier: string | undefined;
    /** Used to secure authorization code grants via Proof Key for Code Exchange (PKCE). */
    readonly code_challenge: string | undefined;
    /** @see {@link OidcClientSettings.authority} */
    readonly authority: string;
    /** @see {@link OidcClientSettings.client_id} */
    readonly client_id: string;
    /** @see {@link OidcClientSettings.redirect_uri} */
    readonly redirect_uri: string;
    /** @see {@link OidcClientSettings.scope} */
    readonly scope: string;
    /** @see {@link OidcClientSettings.client_secret} */
    readonly client_secret: string | undefined;
    /** @see {@link OidcClientSettings.extraTokenParams} */
    readonly extraTokenParams: Record<string, unknown> | undefined;
    /** @see {@link OidcClientSettings.response_mode} */
    readonly response_mode: "query" | "fragment" | undefined;
    readonly skipUserInfo: boolean | undefined;
    private constructor();
    static create(args: SigninStateCreateArgs): Promise<SigninState>;
    toStorageString(): string;
    static fromStorageString(storageString: string): Promise<SigninState>;
}
//# sourceMappingURL=SigninState.d.ts.map