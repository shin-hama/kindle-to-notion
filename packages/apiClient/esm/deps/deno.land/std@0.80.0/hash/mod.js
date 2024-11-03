// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { Hash } from "./_wasm/hash.js";
/**
 * Creates a new `Hash` instance.
 *
 * @param algorithm name of hash algorithm to use
 */
export function createHash(algorithm) {
    return new Hash(algorithm);
}
