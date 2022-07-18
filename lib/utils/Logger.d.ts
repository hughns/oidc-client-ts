/**
 * Native interface
 *
 * @public
 */
export interface ILogger {
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
/**
 * Log levels
 *
 * @public
 */
export declare enum Log {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4
}
/**
 * Log manager
 *
 * @public
 */
export declare namespace Log {
    function reset(): void;
    function setLevel(value: Log): void;
    function setLogger(value: ILogger): void;
}
/**
 * Internal logger instance
 *
 * @public
 */
export declare class Logger {
    private _name;
    private _method?;
    constructor(_name: string);
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    throw(err: Error): never;
    create(method: string): Logger;
    static createStatic(name: string, staticMethod: string): Logger;
    private static _format;
    static debug(name: string, ...args: unknown[]): void;
    static info(name: string, ...args: unknown[]): void;
    static warn(name: string, ...args: unknown[]): void;
    static error(name: string, ...args: unknown[]): void;
}
//# sourceMappingURL=Logger.d.ts.map