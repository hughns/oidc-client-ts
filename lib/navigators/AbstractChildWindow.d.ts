import { Event, Logger } from "../utils";
import type { IWindow, NavigateParams, NavigateResponse } from "./IWindow";
/**
 * Window implementation which resolves via communication from a child window
 * via the `Window.postMessage()` interface.
 *
 * @internal
 */
export declare abstract class AbstractChildWindow implements IWindow {
    protected abstract readonly _logger: Logger;
    protected readonly _abort: Event<[reason: Error]>;
    protected readonly _disposeHandlers: Set<() => void>;
    protected _window: WindowProxy | null;
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    abstract close(): void;
    private _dispose;
    protected static _notifyParent(parent: Window, url: string, keepOpen?: boolean, targetOrigin?: string): void;
}
//# sourceMappingURL=AbstractChildWindow.d.ts.map