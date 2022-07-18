/**
 * Fake state store implementation necessary for validating refresh token requests.
 *
 * @internal
 */
export declare class RefreshState {
    /** custom "state", which can be used by a caller to have "data" round tripped */
    readonly data: unknown | undefined;
    readonly refresh_token: string;
    readonly id_token?: string;
    readonly session_state: string | null;
    readonly scope?: string;
    constructor(args: {
        refresh_token: string;
        id_token?: string;
        session_state: string | null;
        scope?: string;
        state?: unknown;
    });
}
//# sourceMappingURL=RefreshState.d.ts.map