import { Event } from "./Event";
import { Logger } from "./Logger";
/**
 * @internal
 */
export declare class Timer extends Event<[void]> {
    protected readonly _logger: Logger;
    private _timerHandle;
    private _expiration;
    static getEpochTime(): number;
    init(durationInSeconds: number): void;
    get expiration(): number;
    cancel(): void;
    protected _callback: () => void;
}
//# sourceMappingURL=Timer.d.ts.map