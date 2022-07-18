import { PopupWindow, PopupWindowParams } from "./PopupWindow";
import type { INavigator } from "./INavigator";
import type { UserManagerSettingsStore } from "../UserManagerSettings";
/**
 * @internal
 */
export declare class PopupNavigator implements INavigator {
    private _settings;
    private readonly _logger;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ popupWindowFeatures, popupWindowTarget, }: PopupWindowParams): Promise<PopupWindow>;
    callback(url: string, keepOpen?: boolean): Promise<void>;
}
//# sourceMappingURL=PopupNavigator.d.ts.map