import type { IWindow } from "./IWindow";
/**
 * @public
 */
export interface INavigator {
    prepare(params: unknown): Promise<IWindow>;
    callback(url: string, params?: unknown): Promise<void>;
}
//# sourceMappingURL=INavigator.d.ts.map