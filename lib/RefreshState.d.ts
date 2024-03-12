import type { UserProfile } from "./User";
/**
 * Fake state store implementation necessary for validating refresh token requests.
 *
 * @public
 */
export declare class RefreshState {
    /** custom "state", which can be used by a caller to have "data" round tripped */
    readonly data?: unknown;
    readonly refresh_token: string;
    readonly id_token?: string;
    readonly session_state: string | null;
    readonly scope?: string;
    readonly profile: UserProfile;
    constructor(args: {
        refresh_token: string;
        id_token?: string;
        session_state: string | null;
        scope?: string;
        profile: UserProfile;
        state?: unknown;
    });
}
//# sourceMappingURL=RefreshState.d.ts.map