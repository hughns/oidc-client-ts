import { Logger } from "./utils";
import { AccessTokenEvents } from "./AccessTokenEvents";
import type { UserManagerSettingsStore } from "./UserManagerSettings";
import type { User } from "./User";
/**
 * @public
 */
export type UserLoadedCallback = (user: User) => Promise<void> | void;
/**
 * @public
 */
export type UserUnloadedCallback = () => Promise<void> | void;
/**
 * @public
 */
export type SilentRenewErrorCallback = (error: Error) => Promise<void> | void;
/**
 * @public
 */
export type UserSignedInCallback = () => Promise<void> | void;
/**
 * @public
 */
export type UserSignedOutCallback = () => Promise<void> | void;
/**
 * @public
 */
export type UserSessionChangedCallback = () => Promise<void> | void;
/**
 * @public
 */
export declare class UserManagerEvents extends AccessTokenEvents {
    protected readonly _logger: Logger;
    private readonly _userLoaded;
    private readonly _userUnloaded;
    private readonly _silentRenewError;
    private readonly _userSignedIn;
    private readonly _userSignedOut;
    private readonly _userSessionChanged;
    constructor(settings: UserManagerSettingsStore);
    load(user: User, raiseEvent?: boolean): Promise<void>;
    unload(): Promise<void>;
    /**
     * Add callback: Raised when a user session has been established (or re-established).
     */
    addUserLoaded(cb: UserLoadedCallback): () => void;
    /**
     * Remove callback: Raised when a user session has been established (or re-established).
     */
    removeUserLoaded(cb: UserLoadedCallback): void;
    /**
     * Add callback: Raised when a user session has been terminated.
     */
    addUserUnloaded(cb: UserUnloadedCallback): () => void;
    /**
     * Remove callback: Raised when a user session has been terminated.
     */
    removeUserUnloaded(cb: UserUnloadedCallback): void;
    /**
     * Add callback: Raised when the automatic silent renew has failed.
     */
    addSilentRenewError(cb: SilentRenewErrorCallback): () => void;
    /**
     * Remove callback: Raised when the automatic silent renew has failed.
     */
    removeSilentRenewError(cb: SilentRenewErrorCallback): void;
    /**
     * @internal
     */
    _raiseSilentRenewError(e: Error): Promise<void>;
    /**
     * Add callback: Raised when the user is signed in (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    addUserSignedIn(cb: UserSignedInCallback): () => void;
    /**
     * Remove callback: Raised when the user is signed in (when `monitorSession` is set).
     */
    removeUserSignedIn(cb: UserSignedInCallback): void;
    /**
     * @internal
     */
    _raiseUserSignedIn(): Promise<void>;
    /**
     * Add callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    addUserSignedOut(cb: UserSignedOutCallback): () => void;
    /**
     * Remove callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
     */
    removeUserSignedOut(cb: UserSignedOutCallback): void;
    /**
     * @internal
     */
    _raiseUserSignedOut(): Promise<void>;
    /**
     * Add callback: Raised when the user session changed (when `monitorSession` is set).
     * @see {@link UserManagerSettings.monitorSession}
     */
    addUserSessionChanged(cb: UserSessionChangedCallback): () => void;
    /**
     * Remove callback: Raised when the user session changed (when `monitorSession` is set).
     */
    removeUserSessionChanged(cb: UserSessionChangedCallback): void;
    /**
     * @internal
     */
    _raiseUserSessionChanged(): Promise<void>;
}
//# sourceMappingURL=UserManagerEvents.d.ts.map