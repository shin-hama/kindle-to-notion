/**
 * Converts data into a hex-encoded string.
 *
 * @example
 * ```ts
 * import { encodeHex } from "https://deno.land/std@$STD_VERSION/encoding/hex.ts";
 *
 * encodeHex("abc"); // "616263"
 * ```
 */
export declare function encodeHex(src: string | Uint8Array | ArrayBuffer): string;
/**
 * Decodes the given hex-encoded string. If the input is malformed, an error is
 * thrown.
 *
 * @example
 * ```ts
 * import { decodeHex } from "https://deno.land/std@$STD_VERSION/encoding/hex.ts";
 *
 * decodeHex("616263"); // Uint8Array(3) [ 97, 98, 99 ]
 * ```
 */
export declare function decodeHex(src: string): Uint8Array;
//# sourceMappingURL=hex.d.ts.map