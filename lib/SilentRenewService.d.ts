import { Logger } from "./utils";
import type { UserManager } from "./UserManager";
import type { AccessTokenCallback } from "./AccessTokenEvents";
/**
 * @internal
 */
export declare class SilentRenewService {
    private _userManager;
    protected _logger: Logger;
    private _isStarted;
    private readonly _retryTimer;
    constructor(_userManager: UserManager);
    start(): Promise<void>;
    stop(): void;
    protected _tokenExpiring: AccessTokenCallback;
}
//# sourceMappingURL=SilentRenewService.d.ts.map