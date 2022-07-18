/**
 * Error class thrown in case of an authentication error.
 *
 * See https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 *
 * @public
 */
export declare class ErrorResponse extends Error {
    /** The x-www-form-urlencoded request body sent to the authority server */
    readonly form?: URLSearchParams | undefined;
    /** Marker to detect class: "ErrorResponse" */
    readonly name: string;
    /** An error code string that can be used to classify the types of errors that occur and to respond to errors. */
    readonly error: string | null;
    /** additional information that can help a developer identify the cause of the error.*/
    readonly error_description: string | null;
    /**
     * URI identifying a human-readable web page with information about the error, used to provide the client
       developer with additional information about the error.
    */
    readonly error_uri: string | null;
    /** custom state data set during the initial signin request */
    state?: unknown;
    readonly session_state: string | null;
    constructor(args: {
        error?: string | null;
        error_description?: string | null;
        error_uri?: string | null;
        userState?: unknown;
        session_state?: string | null;
    }, 
    /** The x-www-form-urlencoded request body sent to the authority server */
    form?: URLSearchParams | undefined);
}
//# sourceMappingURL=ErrorResponse.d.ts.map