import type { OidcClientSettingsStore, SigningKey } from "./OidcClientSettings";
import type { OidcMetadata } from "./OidcMetadata";
/**
 * @public
 * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
 */
export declare class MetadataService {
    private readonly _settings;
    private readonly _logger;
    private readonly _jsonService;
    private _metadataUrl;
    private _signingKeys;
    private _metadata;
    private _fetchRequestCredentials;
    constructor(_settings: OidcClientSettingsStore);
    resetSigningKeys(): void;
    getMetadata(): Promise<Partial<OidcMetadata>>;
    getIssuer(): Promise<string>;
    getAuthorizationEndpoint(): Promise<string>;
    getUserInfoEndpoint(): Promise<string>;
    getTokenEndpoint(optional: false): Promise<string>;
    getTokenEndpoint(optional?: true): Promise<string | undefined>;
    getCheckSessionIframe(): Promise<string | undefined>;
    getEndSessionEndpoint(): Promise<string | undefined>;
    getRevocationEndpoint(optional: false): Promise<string>;
    getRevocationEndpoint(optional?: true): Promise<string | undefined>;
    getKeysEndpoint(optional: false): Promise<string>;
    getKeysEndpoint(optional?: true): Promise<string | undefined>;
    protected _getMetadataProperty(name: keyof OidcMetadata, optional?: boolean): Promise<string | boolean | string[] | undefined>;
    getSigningKeys(): Promise<SigningKey[] | null>;
}
//# sourceMappingURL=MetadataService.d.ts.map