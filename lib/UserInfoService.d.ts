import { Logger } from "./utils";
import type { MetadataService } from "./MetadataService";
import type { JwtClaims } from "./Claims";
/**
 * @internal
 */
export declare class UserInfoService {
    private readonly _metadataService;
    protected readonly _logger: Logger;
    private readonly _jsonService;
    constructor(_metadataService: MetadataService);
    getClaims(token: string): Promise<JwtClaims>;
    protected _getClaimsFromJwt: (responseText: string) => Promise<JwtClaims>;
}
//# sourceMappingURL=UserInfoService.d.ts.map