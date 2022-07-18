import { Logger } from "../utils";
import type { NavigateParams, NavigateResponse } from "./IWindow";
import { AbstractChildWindow } from "./AbstractChildWindow";
/**
 * @public
 */
export interface IFrameWindowParams {
    silentRequestTimeoutInSeconds?: number;
}
/**
 * @internal
 */
export declare class IFrameWindow extends AbstractChildWindow {
    protected readonly _logger: Logger;
    private _frame;
    private _timeoutInSeconds;
    constructor({ silentRequestTimeoutInSeconds, }: IFrameWindowParams);
    private static createHiddenIframe;
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
    static notifyParent(url: string, targetOrigin?: string): void;
}
//# sourceMappingURL=IFrameWindow.d.ts.map