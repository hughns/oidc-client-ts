/**
 * @internal
 */
export declare type JwtHandler = (text: string) => Promise<Record<string, unknown>>;
/**
 * @internal
 */
export interface GetJsonOpts {
    token?: string;
}
/**
 * @internal
 */
export interface PostFormOpts {
    body: URLSearchParams;
    basicAuth?: string;
    timeoutInSeconds?: number;
}
/**
 * @internal
 */
export declare class JsonService {
    private _jwtHandler;
    private readonly _logger;
    private _contentTypes;
    constructor(additionalContentTypes?: string[], _jwtHandler?: JwtHandler | null);
    protected fetchWithTimeout(input: RequestInfo, init?: RequestInit & {
        timeoutInSeconds?: number;
    }): Promise<Response>;
    getJson(url: string, { token, }?: GetJsonOpts): Promise<Record<string, unknown>>;
    postForm(url: string, { body, basicAuth, timeoutInSeconds, }: PostFormOpts): Promise<Record<string, unknown>>;
}
//# sourceMappingURL=JsonService.d.ts.map