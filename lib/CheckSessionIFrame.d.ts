/**
 * @internal
 */
export declare class CheckSessionIFrame {
    private _callback;
    private _client_id;
    private _intervalInSeconds;
    private _stopOnError;
    private readonly _logger;
    private _frame_origin;
    private _frame;
    private _timer;
    private _session_state;
    constructor(_callback: () => Promise<void>, _client_id: string, url: string, _intervalInSeconds: number, _stopOnError: boolean);
    load(): Promise<void>;
    private _message;
    start(session_state: string): void;
    stop(): void;
}
//# sourceMappingURL=CheckSessionIFrame.d.ts.map