import { Logger } from "./Logger";
/**
 * @internal
 */
export declare type Callback<EventType extends unknown[]> = (...ev: EventType) => (Promise<void> | void);
/**
 * @internal
 */
export declare class Event<EventType extends unknown[]> {
    protected readonly _name: string;
    protected readonly _logger: Logger;
    private _callbacks;
    constructor(_name: string);
    addHandler(cb: Callback<EventType>): () => void;
    removeHandler(cb: Callback<EventType>): void;
    raise(...ev: EventType): void;
}
//# sourceMappingURL=Event.d.ts.map