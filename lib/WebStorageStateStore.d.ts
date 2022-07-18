import type { StateStore } from "./StateStore";
/**
 * @public
 */
export declare class WebStorageStateStore implements StateStore {
    private readonly _logger;
    private readonly _store;
    private readonly _prefix;
    constructor({ prefix, store }?: {
        prefix?: string | undefined;
        store?: Storage | undefined;
    });
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}
//# sourceMappingURL=WebStorageStateStore.d.ts.map