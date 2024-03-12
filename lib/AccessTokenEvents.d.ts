import { Logger } from "./utils";
import type { User } from "./User";
/**
 * @public
 */
export type AccessTokenCallback = (...ev: unknown[]) => (Promise<void> | void);
/**
 * @public
 */
export declare class AccessTokenEvents {
    protected readonly _logger: Logger;
    private readonly _expiringTimer;
    private readonly _expiredTimer;
    private readonly _expiringNotificationTimeInSeconds;
    constructor(args: {
        expiringNotificationTimeInSeconds: number;
    });
    load(container: User): void;
    unload(): void;
    /**
     * Add callback: Raised prior to the access token expiring.
     */
    addAccessTokenExpiring(cb: AccessTokenCallback): () => void;
    /**
     * Remove callback: Raised prior to the access token expiring.
     */
    removeAccessTokenExpiring(cb: AccessTokenCallback): void;
    /**
     * Add callback: Raised after the access token has expired.
     */
    addAccessTokenExpired(cb: AccessTokenCallback): () => void;
    /**
     * Remove callback: Raised after the access token has expired.
     */
    removeAccessTokenExpired(cb: AccessTokenCallback): void;
}
//# sourceMappingURL=AccessTokenEvents.d.ts.map