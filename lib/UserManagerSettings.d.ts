import { OidcClientSettings, OidcClientSettingsStore } from "./OidcClientSettings";
import type { PopupWindowFeatures } from "./utils/PopupUtils";
import { WebStorageStateStore } from "./WebStorageStateStore";
export declare const DefaultPopupWindowFeatures: PopupWindowFeatures;
export declare const DefaultPopupTarget = "_blank";
export declare const DefaultSilentRequestTimeoutInSeconds = 10;
/**
 * The settings used to configure the {@link UserManager}.
 *
 * @public
 */
export interface UserManagerSettings extends OidcClientSettings {
    /** The URL for the page containing the call to signinPopupCallback to handle the callback from the OIDC/OAuth2 */
    popup_redirect_uri?: string;
    popup_post_logout_redirect_uri?: string;
    /**
     * The features parameter to window.open for the popup signin window. By default, the popup is
     * placed centered in front of the window opener.
     * (default: \{ location: false, menubar: false, height: 640 \})
     */
    popupWindowFeatures?: PopupWindowFeatures;
    /** The target parameter to window.open for the popup signin window (default: "_blank") */
    popupWindowTarget?: string;
    /** The methods window.location method used to redirect (default: "assign") */
    redirectMethod?: "replace" | "assign";
    /** The methods target window being redirected (default: "self") */
    redirectTarget?: "top" | "self";
    /** The target to pass while calling postMessage inside iframe for callback (default: window.location.origin) */
    iframeNotifyParentOrigin?: string;
    /** The script origin to check during 'message' callback execution while performing silent auth via iframe (default: window.location.origin) */
    iframeScriptOrigin?: string;
    /** The URL for the page containing the code handling the silent renew */
    silent_redirect_uri?: string;
    /** Number of seconds to wait for the silent renew to return before assuming it has failed or timed out (default: 10) */
    silentRequestTimeoutInSeconds?: number;
    /** Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration (default: true) */
    automaticSilentRenew?: boolean;
    /** Flag to validate user.profile.sub in silent renew calls (default: true) */
    validateSubOnSilentRenew?: boolean;
    /** Flag to control if id_token is included as id_token_hint in silent renew calls (default: false) */
    includeIdTokenInSilentRenew?: boolean;
    /** Will raise events for when user has performed a signout at the OP (default: false) */
    monitorSession?: boolean;
    monitorAnonymousSession?: boolean;
    /** Interval in seconds to check the user's session (default: 2) */
    checkSessionIntervalInSeconds?: number;
    query_status_response_type?: string;
    stopCheckSessionOnError?: boolean;
    /**
     * The `token_type_hint`s to pass to the authority server by default (default: ["access_token", "refresh_token"])
     *
     * Token types will be revoked in the same order as they are given here.
     */
    revokeTokenTypes?: ("access_token" | "refresh_token")[];
    /** Will invoke the revocation endpoint on signout if there is an access token for the user (default: false) */
    revokeTokensOnSignout?: boolean;
    /** The number of seconds before an access token is to expire to raise the accessTokenExpiring event (default: 60) */
    accessTokenExpiringNotificationTimeInSeconds?: number;
    /**
     * Storage object used to persist User for currently authenticated user (default: window.sessionStorage, InMemoryWebStorage iff no window).
     *  E.g. `userStore: new WebStorageStateStore({ store: window.localStorage })`
     */
    userStore?: WebStorageStateStore;
}
/**
 * The settings with defaults applied of the {@link UserManager}.
 * @see {@link UserManagerSettings}
 *
 * @public
 */
export declare class UserManagerSettingsStore extends OidcClientSettingsStore {
    readonly popup_redirect_uri: string;
    readonly popup_post_logout_redirect_uri: string | undefined;
    readonly popupWindowFeatures: PopupWindowFeatures;
    readonly popupWindowTarget: string;
    readonly redirectMethod: "replace" | "assign";
    readonly redirectTarget: "top" | "self";
    readonly iframeNotifyParentOrigin: string | undefined;
    readonly iframeScriptOrigin: string | undefined;
    readonly silent_redirect_uri: string;
    readonly silentRequestTimeoutInSeconds: number;
    readonly automaticSilentRenew: boolean;
    readonly validateSubOnSilentRenew: boolean;
    readonly includeIdTokenInSilentRenew: boolean;
    readonly monitorSession: boolean;
    readonly monitorAnonymousSession: boolean;
    readonly checkSessionIntervalInSeconds: number;
    readonly query_status_response_type: string;
    readonly stopCheckSessionOnError: boolean;
    readonly revokeTokenTypes: ("access_token" | "refresh_token")[];
    readonly revokeTokensOnSignout: boolean;
    readonly accessTokenExpiringNotificationTimeInSeconds: number;
    readonly userStore: WebStorageStateStore;
    constructor(args: UserManagerSettings);
}
//# sourceMappingURL=UserManagerSettings.d.ts.map