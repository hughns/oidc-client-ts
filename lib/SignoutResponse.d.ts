/**
 * @public
 */
export declare class SignoutResponse {
    readonly state: string | null;
    /** @see {@link ErrorResponse.error} */
    error: string | null;
    /** @see {@link ErrorResponse.error_description} */
    error_description: string | null;
    /** @see {@link ErrorResponse.error_uri} */
    error_uri: string | null;
    /** custom state data set during the initial signin request */
    userState: unknown;
    constructor(params: URLSearchParams);
}
//# sourceMappingURL=SignoutResponse.d.ts.map