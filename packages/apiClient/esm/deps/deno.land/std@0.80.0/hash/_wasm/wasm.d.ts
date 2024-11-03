/**
* @param {string} algorithm
* @returns {DenoHash}
*/
export function create_hash(algorithm: string): DenoHash;
/**
* @param {DenoHash} hash
* @param {Uint8Array} data
*/
export function update_hash(hash: DenoHash, data: Uint8Array): void;
/**
* @param {DenoHash} hash
* @returns {Uint8Array}
*/
export function digest_hash(hash: DenoHash): Uint8Array;
export const source: Uint8Array;
/**
*/
export class DenoHash {
    static __wrap(ptr: any): any;
    free(): void;
    ptr: number | undefined;
}
export default init;
declare function init(input: any): Promise<any>;
//# sourceMappingURL=wasm.d.ts.map