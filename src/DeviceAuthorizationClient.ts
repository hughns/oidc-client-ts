// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { Logger } from "./utils";
import { JsonService } from "./JsonService";
import type { MetadataService } from "./MetadataService";
import type { OidcClientSettingsStore } from "./OidcClientSettings";
import type { TokenClient } from "./TokenClient";

/**
 * @internal
 */
export interface DeviceAuthorizationRequest {
    client_id: string;
    scope?: string;
}

/**
 * @internal
 */
export interface DeviceAuthorizationRequestArgs {
    client_id?: string;
    scope?: string;
}

/**
 * @internal
 */
export interface DeviceAuthorizationResponse {
    device_code: string;
    user_code: string;
    verification_uri: string;
    verification_uri_complete?: string;
    expires_in: number;
    interval?: number;
}

/**
 * @internal
 */
export interface RevokeArgs {
    token: string;
    token_type_hint?: "access_token" | "refresh_token";
}

/**
 * @internal
 */
export class DeviceAuthorizationClient {
    private readonly _logger = new Logger("TokenClient");
    private readonly _jsonService = new JsonService();
    private _responseInProgress?: DeviceAuthorizationResponse;

    public constructor(
        private readonly _settings: OidcClientSettingsStore,
        private readonly _metadataService: MetadataService,
        private readonly _tokenClient: TokenClient,
    ) {}

    public async startDeviceAuthorization({
        client_id = this._settings.client_id,
        scope,
    }: DeviceAuthorizationRequestArgs): Promise<DeviceAuthorizationResponse> {
        const logger = this._logger.create("startDeviceAuthorization");

        if (!client_id) {
            logger.throw(new Error("A client_id is required"));
        }

        const params = new URLSearchParams({ client_id });
        if (scope) {
            params.set("scope", scope);
        }

        const url = (await this._metadataService.getMetadata()).device_authorization_endpoint;
        if (!url) {
            logger.throw(new Error("No device_authorization_endpoint given"));
            throw null;
        }

        logger.debug("got device authorization endpoint");

        const response = await this._jsonService.postForm(url, { body: params });
        logger.debug("got response");

        this._responseInProgress = response as unknown as DeviceAuthorizationResponse;

        return this._responseInProgress;
    }

    public async waitForDeviceAuthorization({ device_code }: DeviceAuthorizationResponse): Promise<Record<string, unknown>> {
        return await this._tokenClient.deviceAccessToken({
            device_code,
        });
    }
}
