import { Logger } from "./utils";
import type { MetadataService } from "./MetadataService";
import { UserInfoService } from "./UserInfoService";
import { TokenClient } from "./TokenClient";
import type { OidcClientSettingsStore } from "./OidcClientSettings";
import type { SigninState } from "./SigninState";
import type { SigninResponse } from "./SigninResponse";
import type { State } from "./State";
import type { SignoutResponse } from "./SignoutResponse";
import type { RefreshState } from "./RefreshState";
import type { ClaimsService } from "./ClaimsService";
/**
 * @internal
 */
export declare class ResponseValidator {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _metadataService: MetadataService;
    protected readonly _claimsService: ClaimsService;
    protected readonly _logger: Logger;
    protected readonly _userInfoService: UserInfoService;
    protected readonly _tokenClient: TokenClient;
    constructor(_settings: OidcClientSettingsStore, _metadataService: MetadataService, _claimsService: ClaimsService);
    validateSigninResponse(response: SigninResponse, state: SigninState): Promise<void>;
    validateCredentialsResponse(response: SigninResponse, skipUserInfo: boolean): Promise<void>;
    validateRefreshResponse(response: SigninResponse, state: RefreshState): Promise<void>;
    validateSignoutResponse(response: SignoutResponse, state: State): void;
    protected _processSigninState(response: SigninResponse, state: SigninState): void;
    protected _processClaims(response: SigninResponse, skipUserInfo?: boolean, validateSub?: boolean): Promise<void>;
    protected _processCode(response: SigninResponse, state: SigninState): Promise<void>;
    protected _validateIdTokenAttributes(response: SigninResponse, existingToken?: string): void;
}
//# sourceMappingURL=ResponseValidator.d.ts.map