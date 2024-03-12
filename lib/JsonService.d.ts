import type { ExtraHeader } from "./OidcClientSettings";
/**
 * @internal
 */
export type JwtHandler = (text: string) => Promise<Record<string, unknown>>;
/**
 * @internal
 */
export interface GetJsonOpts {
    token?: string;
    credentials?: RequestCredentials;
}
/**
 * @internal
 */
export interface PostFormOpts {
    body: URLSearchParams;
    basicAuth?: string;
    timeoutInSeconds?: number;
    initCredentials?: "same-origin" | "include" | "omit";
}
/**
 * @internal
 */
export declare class JsonService {
    private _jwtHandler;
    private _extraHeaders;
    private readonly _logger;
    private _contentTypes;
    constructor(additionalContentTypes?: string[], _jwtHandler?: JwtHandler | null, _extraHeaders?: Record<string, ExtraHeader>);
    protected fetchWithTimeout(input: RequestInfo, init?: RequestInit & {
        timeoutInSeconds?: number;
    }): Promise<Response>;
    getJson(url: string, { token, credentials, }?: GetJsonOpts): Promise<Record<string, unknown>>;
    postForm(url: string, { body, basicAuth, timeoutInSeconds, initCredentials, }: PostFormOpts): Promise<Record<string, unknown>>;
    private appendExtraHeaders;
}
//# sourceMappingURL=JsonService.d.ts.map