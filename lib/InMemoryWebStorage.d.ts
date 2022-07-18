/**
 * @public
 */
export declare class InMemoryWebStorage implements Storage {
    private readonly _logger;
    private _data;
    clear(): void;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    get length(): number;
    key(index: number): string;
}
//# sourceMappingURL=InMemoryWebStorage.d.ts.map