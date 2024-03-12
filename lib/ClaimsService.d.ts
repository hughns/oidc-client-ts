import type { JwtClaims } from "./Claims";
import type { OidcClientSettingsStore } from "./OidcClientSettings";
import type { UserProfile } from "./User";
import { Logger } from "./utils";
/**
 * @internal
 */
export declare class ClaimsService {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _logger: Logger;
    constructor(_settings: OidcClientSettingsStore);
    filterProtocolClaims(claims: UserProfile): UserProfile;
    mergeClaims(claims1: JwtClaims, claims2: JwtClaims): UserProfile;
}
//# sourceMappingURL=ClaimsService.d.ts.map