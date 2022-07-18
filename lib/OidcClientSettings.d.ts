import type { OidcMetadata } from "./OidcMetadata";
import type { StateStore } from "./StateStore";
/**
 * @public
 */
export declare type SigningKey = Record<string, string | string[]>;
/**
 * The settings used to configure the {@link OidcClient}.
 *
 * @public
 */
export interface OidcClientSettings {
    /** The URL of the OIDC/OAuth2 provider */
    authority: string;
    metadataUrl?: string;
    /** Provide metadata when authority server does not allow CORS on the metadata endpoint */
    metadata?: Partial<OidcMetadata>;
    /** Can be used to seed or add additional values to the results of the discovery request */
    metadataSeed?: Partial<OidcMetadata>;
    /** Provide signingKeys when authority server does not allow CORS on the jwks uri */
    signingKeys?: SigningKey[];
    /** Your client application's identifier as registered with the OIDC/OAuth2 */
    client_id: string;
    client_secret?: string;
    /** The type of response desired from the OIDC/OAuth2 provider (default: "code") */
    response_type?: string;
    /** The scope being requested from the OIDC/OAuth2 provider (default: "openid") */
    scope?: string;
    /** The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider */
    redirect_uri: string;
    /** The OIDC/OAuth2 post-logout redirect URI */
    post_logout_redirect_uri?: string;
    /**
     * Client authentication method that is used to authenticate when using the token endpoint (default: "client_secret_post")
     * - "client_secret_basic": using the HTTP Basic authentication scheme
     * - "client_secret_post": including the client credentials in the request body
     *
     * See https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
     */
    client_authentication?: "client_secret_basic" | "client_secret_post";
    /** optional protocol param */
    prompt?: string;
    /** optional protocol param */
    display?: string;
    /** optional protocol param */
    max_age?: number;
    /** optional protocol param */
    ui_locales?: string;
    /** optional protocol param */
    acr_values?: string;
    /** optional protocol param */
    resource?: string;
    /** optional protocol param (default: "query") */
    response_mode?: "query" | "fragment";
    /** Should OIDC protocol claims be removed from profile (default: true) */
    filterProtocolClaims?: boolean;
    /** Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile (default: false) */
    loadUserInfo?: boolean;
    /** Number (in seconds) indicating the age of state entries in storage for authorize requests that are considered abandoned and thus can be cleaned up (default: 300) */
    staleStateAgeInSeconds?: number;
    /** @deprecated Unused */
    clockSkewInSeconds?: number;
    /** @deprecated Unused */
    userInfoJwtIssuer?: "ANY" | "OP" | string;
    /**
     * Indicates if objects returned from the user info endpoint as claims (e.g. `address`) are merged into the claims from the id token as a single object.
     * Otherwise, they are added to an array as distinct objects for the claim type. (default: false)
     */
    mergeClaims?: boolean;
    /**
     * Storage object used to persist interaction state (default: window.localStorage, InMemoryWebStorage iff no window).
     * E.g. `stateStore: new WebStorageStateStore({ store: window.localStorage })`
     */
    stateStore?: StateStore;
    /**
     * An object containing additional query string parameters to be including in the authorization request.
     * E.g, when using Azure AD to obtain an access token an additional resource parameter is required. extraQueryParams: `{resource:"some_identifier"}`
     */
    extraQueryParams?: Record<string, string | number | boolean>;
    extraTokenParams?: Record<string, unknown>;
}
/**
 * The settings with defaults applied of the {@link OidcClient}.
 * @see {@link OidcClientSettings}
 *
 * @public
 */
export declare class OidcClientSettingsStore {
    readonly authority: string;
    readonly metadataUrl: string;
    readonly metadata: Partial<OidcMetadata> | undefined;
    readonly metadataSeed: Partial<OidcMetadata> | undefined;
    readonly signingKeys: SigningKey[] | undefined;
    readonly client_id: string;
    readonly client_secret: string | undefined;
    readonly response_type: string;
    readonly scope: string;
    readonly redirect_uri: string;
    readonly post_logout_redirect_uri: string | undefined;
    readonly client_authentication: "client_secret_basic" | "client_secret_post";
    readonly prompt: string | undefined;
    readonly display: string | undefined;
    readonly max_age: number | undefined;
    readonly ui_locales: string | undefined;
    readonly acr_values: string | undefined;
    readonly resource: string | undefined;
    readonly response_mode: "query" | "fragment";
    readonly filterProtocolClaims: boolean;
    readonly loadUserInfo: boolean;
    readonly staleStateAgeInSeconds: number;
    readonly clockSkewInSeconds: number;
    readonly userInfoJwtIssuer: "ANY" | "OP" | string;
    readonly mergeClaims: boolean;
    readonly stateStore: StateStore;
    readonly extraQueryParams: Record<string, string | number | boolean>;
    readonly extraTokenParams: Record<string, unknown>;
    constructor({ authority, metadataUrl, metadata, signingKeys, metadataSeed, client_id, client_secret, response_type, scope, redirect_uri, post_logout_redirect_uri, client_authentication, prompt, display, max_age, ui_locales, acr_values, resource, response_mode, filterProtocolClaims, loadUserInfo, staleStateAgeInSeconds, clockSkewInSeconds, userInfoJwtIssuer, mergeClaims, stateStore, extraQueryParams, extraTokenParams, }: OidcClientSettings);
}
//# sourceMappingURL=OidcClientSettings.d.ts.map