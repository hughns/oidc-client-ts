import type { UserManagerSettingsStore } from "../UserManagerSettings";
import type { INavigator } from "./INavigator";
import type { IWindow } from "./IWindow";
/**
 * @public
 */
export interface RedirectParams {
    redirectMethod?: "replace" | "assign";
    redirectTarget?: "top" | "self";
}
/**
 * @internal
 */
export declare class RedirectNavigator implements INavigator {
    private _settings;
    private readonly _logger;
    constructor(_settings: UserManagerSettingsStore);
    prepare({ redirectMethod, redirectTarget, }: RedirectParams): Promise<IWindow>;
}
//# sourceMappingURL=RedirectNavigator.d.ts.map