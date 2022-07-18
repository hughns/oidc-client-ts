import type { UserManager } from "./UserManager";
import type { User } from "./User";
/**
 * @public
 */
export declare class SessionMonitor {
    private readonly _userManager;
    private readonly _logger;
    private _sub;
    private _sid;
    private _checkSessionIFrame?;
    constructor(_userManager: UserManager);
    protected _init(): Promise<void>;
    protected _start: (user: User | {
        session_state: string;
        profile: {
            sub: string;
            sid: string;
        } | null;
    }) => Promise<void>;
    protected _stop: () => void;
    protected _callback: () => Promise<void>;
}
//# sourceMappingURL=SessionMonitor.d.ts.map