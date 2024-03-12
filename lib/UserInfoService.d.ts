import { Logger } from "./utils";
import type { MetadataService } from "./MetadataService";
import type { JwtClaims } from "./Claims";
import type { OidcClientSettingsStore } from "./OidcClientSettings";
/**
 * @internal
 */
export declare class UserInfoService {
    private readonly _settings;
    private readonly _metadataService;
    protected readonly _logger: Logger;
    private readonly _jsonService;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService);
    getClaims(token: string): Promise<JwtClaims>;
    protected _getClaimsFromJwt: (responseText: string) => Promise<JwtClaims>;
}
//# sourceMappingURL=UserInfoService.d.ts.map