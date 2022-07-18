import type { StateStore } from "./StateStore";
/**
 * @public
 */
export declare class State {
    readonly id: string;
    readonly created: number;
    readonly request_type: string | undefined;
    /** custom "state", which can be used by a caller to have "data" round tripped */
    readonly data: unknown | undefined;
    constructor(args: {
        id?: string;
        data?: unknown;
        created?: number;
        request_type?: string;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): State;
    static clearStaleState(storage: StateStore, age: number): Promise<void>;
}
//# sourceMappingURL=State.d.ts.map