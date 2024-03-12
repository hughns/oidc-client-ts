import { Logger, type PopupWindowFeatures } from "../utils";
import { AbstractChildWindow } from "./AbstractChildWindow";
import type { NavigateParams, NavigateResponse } from "./IWindow";
/**
 * @public
 */
export interface PopupWindowParams {
    popupWindowFeatures?: PopupWindowFeatures;
    popupWindowTarget?: string;
}
/**
 * @internal
 */
export declare class PopupWindow extends AbstractChildWindow {
    protected readonly _logger: Logger;
    protected _window: WindowProxy | null;
    constructor({ popupWindowTarget, popupWindowFeatures, }: PopupWindowParams);
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
    static notifyOpener(url: string, keepOpen: boolean): void;
}
//# sourceMappingURL=PopupWindow.d.ts.map