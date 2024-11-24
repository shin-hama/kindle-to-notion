/**
 * Convert data into a base64url-encoded string.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc4648#section-5}
 *
 * @example
 * ```ts
 * import { encodeBase64Url } from "https://deno.land/std@$STD_VERSION/encoding/base64url.ts";
 *
 * encodeBase64Url(new TextEncoder().encode("foobar")); // "Zm9vYmFy"
 * ```
 */
export declare function encodeBase64Url(data: ArrayBuffer | Uint8Array | string): string;
/**
 * Decodes a given base64url-encoded string.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc4648#section-5}
 *
 * @example
 * ```ts
 * import { decodeBase64Url } from "https://deno.land/std@$STD_VERSION/encoding/base64url.ts";
 *
 * decodeBase64Url("Zm9vYmFy"); // Uint8Array(6) [ 102, 111, 111, 98, 97, 114 ]
 * ```
 */
export declare function decodeBase64Url(b64url: string): Uint8Array;
//# sourceMappingURL=base64url.d.ts.map