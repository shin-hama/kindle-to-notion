import { type Algorithm } from "./algorithm.js";
/**
 * JWT §1: JWTs encode claims to be transmitted as a JSON [RFC7159] object [...].
 * JWT §4.1: The following Claim Names are registered in the IANA
 * "JSON Web Token Claims" registry established by Section 10.1. None of the
 * claims defined below are intended to be mandatory to use or implement in all
 * cases, but rather they provide a starting point for a set of useful,
 * interoperable claims.
 * Applications using JWTs should define which specific claims they use and when
 * they are required or optional.
 */
export interface Payload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [key: string]: unknown;
}
/**
 * JWS §4.1.1: The "alg" value is a case-sensitive ASCII string containing a
 * StringOrURI value. This Header Parameter MUST be present and MUST be
 * understood and processed by implementations.
 */
export interface Header {
    alg: Algorithm;
    [key: string]: unknown;
}
/**
 * With `expLeeway` and `nbfLeeway` implementers may provide for some small
 * leeway to account for clock skew (JWT §4.1.4). The default is 1 second.
 * By passing the option `audience`, this application tries to identify the
 * recipient with a value in the `aud` claim. If the values don't match, an
 * `Error` is thrown.
 */
export type VerifyOptions = {
    expLeeway?: number;
    nbfLeeway?: number;
    ignoreExp?: boolean;
    ignoreNbf?: boolean;
    audience?: string | string[] | RegExp;
    predicates?: (<P extends Payload>(payload: P) => boolean)[];
};
export declare function validateTimingClaims(payload: Payload, { expLeeway, nbfLeeway, ignoreExp, ignoreNbf }?: VerifyOptions): void;
export declare function validateAudClaim(aud: unknown, audience: Required<VerifyOptions>["audience"]): void;
/**
 * Takes a `jwt` and returns a 3-tuple `[unknown, unknown, Uint8Array]` if the
 * jwt has a valid _serialization_. Otherwise it throws an `Error`. This function
 * does **not** verify the digital signature.
 */
export declare function decode<PayloadType extends Payload | unknown = unknown>(jwt: string): [unknown, PayloadType, Uint8Array];
/** It does **not** verify the digital signature. */
export declare function validate([header, payload, signature]: [any, any, Uint8Array], options?: VerifyOptions): {
    header: Header;
    payload: Payload;
    signature: Uint8Array;
};
/**
 * Takes jwt, `CryptoKey` and `VerifyOptions` and returns the `Payload` of the
 * jwt if the jwt is valid. Otherwise it throws an `Error`.
 */
export declare function verify<PayloadType extends Payload>(jwt: string, key: CryptoKey | null, options?: VerifyOptions): Promise<PayloadType>;
/**
 * Takes `Header`, `Payload` and `CryptoKey` and returns the url-safe encoded
 * jwt.
 */
export declare function create(header: Header, payload: Payload, key: CryptoKey | null): Promise<string>;
/**
 * This helper function simplifies setting a `NumericDate`. It takes either a
 * `Date` object or a `number` (in seconds) and returns the `number` of seconds
 * from 1970-01-01T00:00:00Z UTC until the specified UTC date/time.
 */
export declare function getNumericDate(exp: number | Date): number;
//# sourceMappingURL=mod.d.ts.map