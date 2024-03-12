/**
 * @public
 */
export interface NavigateParams {
    url: string;
    /** The request "nonce" parameter. */
    nonce?: string;
    /** The request "state" parameter. For sign out requests, this parameter is optional. */
    state?: string;
    response_mode?: "query" | "fragment";
    scriptOrigin?: string;
}
/**
 * @public
 */
export interface NavigateResponse {
    url: string;
}
/**
 * @public
 */
export interface IWindow {
    navigate(params: NavigateParams): Promise<NavigateResponse>;
    close(): void;
}
//# sourceMappingURL=IWindow.d.ts.map