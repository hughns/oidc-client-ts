/**
 * @internal
 */
export declare class CryptoUtils {
    private static _randomWord;
    /**
     * Generates RFC4122 version 4 guid
     */
    static generateUUIDv4(): string;
    /**
     * PKCE: Generate a code verifier
     */
    static generateCodeVerifier(): string;
    /**
     * PKCE: Generate a code challenge
     */
    static generateCodeChallenge(code_verifier: string): string;
    /**
     * Generates a base64-encoded string for a basic auth header
     */
    static generateBasicAuth(client_id: string, client_secret: string): string;
}
//# sourceMappingURL=CryptoUtils.d.ts.map