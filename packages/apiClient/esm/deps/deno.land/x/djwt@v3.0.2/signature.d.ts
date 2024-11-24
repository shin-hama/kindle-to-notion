import type { Algorithm } from "./algorithm.js";
export declare function verify(signature: Uint8Array, key: CryptoKey | null, alg: Algorithm, signingInput: string): Promise<boolean>;
export declare function create(alg: Algorithm, key: CryptoKey | null, signingInput: string): Promise<string>;
//# sourceMappingURL=signature.d.ts.map