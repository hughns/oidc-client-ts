import type { MetadataService } from "./MetadataService";
import type { OidcClientSettingsStore } from "./OidcClientSettings";
import type { TokenClient } from "./TokenClient";
/**
 * @internal
 */
export interface DeviceAuthorizationRequest {
    client_id: string;
    scope?: string;
}
/**
 * @internal
 */
export interface DeviceAuthorizationRequestArgs {
    client_id?: string;
    scope?: string;
}
/**
 * @internal
 */
export interface DeviceAuthorizationResponse {
    device_code: string;
    user_code: string;
    verification_uri: string;
    verification_uri_complete?: string;
    expires_in: number;
    interval?: number;
}
/**
 * @internal
 */
export interface RevokeArgs {
    token: string;
    token_type_hint?: "access_token" | "refresh_token";
}
/**
 * @internal
 */
export declare class DeviceAuthorizationClient {
    private readonly _settings;
    private readonly _metadataService;
    private readonly _tokenClient;
    private readonly _logger;
    private readonly _jsonService;
    private _responseInProgress?;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService, _tokenClient: TokenClient);
    startDeviceAuthorization({ client_id, scope, }: DeviceAuthorizationRequestArgs): Promise<DeviceAuthorizationResponse>;
    waitForDeviceAuthorization({ device_code }: DeviceAuthorizationResponse): Promise<Record<string, unknown>>;
}
//# sourceMappingURL=DeviceAuthorizationClient.d.ts.map