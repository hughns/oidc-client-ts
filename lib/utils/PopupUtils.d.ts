/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/open#window_features
 *
 * @public
 */
export interface PopupWindowFeatures {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    menubar?: boolean | string;
    toolbar?: boolean | string;
    location?: boolean | string;
    status?: boolean | string;
    resizable?: boolean | string;
    scrollbars?: boolean | string;
    [k: string]: boolean | string | number | undefined;
}
export declare class PopupUtils {
    /**
     * Populates a map of window features with a placement centered in front of
     * the current window. If no explicit width is given, a default value is
     * binned into [800, 720, 600, 480, 360] based on the current window's width.
     */
    static center({ ...features }: PopupWindowFeatures): PopupWindowFeatures;
    static serialize(features: PopupWindowFeatures): string;
}
//# sourceMappingURL=PopupUtils.d.ts.map