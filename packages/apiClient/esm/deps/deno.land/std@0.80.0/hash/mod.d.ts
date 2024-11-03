import type { Hasher } from "./hasher.js";
export type { Hasher } from "./hasher.js";
export type SupportedAlgorithm = "md2" | "md4" | "md5" | "ripemd160" | "ripemd320" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512" | "sha3-224" | "sha3-256" | "sha3-384" | "sha3-512" | "keccak224" | "keccak256" | "keccak384" | "keccak512";
/**
 * Creates a new `Hash` instance.
 *
 * @param algorithm name of hash algorithm to use
 */
export declare function createHash(algorithm: SupportedAlgorithm): Hasher;
//# sourceMappingURL=mod.d.ts.map