import type { UserManagerSettingsStore } from "../UserManagerSettings";
import { IFrameWindow, IFrameWindowParams } from "./IFrameWindow";
import type { INavigator } from "./INavigator";
/**
 * @internal
 */
export declare class IFrameNavigator implements INavigator {
    private _settings;
    private readonly _logger;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ silentRequestTimeoutInSeconds, }: IFrameWindowParams): Promise<IFrameWindow>;
    callback(url: string): Promise<void>;
}
//# sourceMappingURL=IFrameNavigator.d.ts.map