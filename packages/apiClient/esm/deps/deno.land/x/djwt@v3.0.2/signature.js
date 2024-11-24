import { getAlgorithm } from "./algorithm.js";
import { encodeBase64Url } from "./deps.js";
import { encoder, isNull } from "./util.js";
export async function verify(signature, key, alg, signingInput) {
    return isNull(key) ? signature.length === 0 : await crypto.subtle.verify(getAlgorithm(alg), key, signature, encoder.encode(signingInput));
}
export async function create(alg, key, signingInput) {
    return isNull(key) ? "" : encodeBase64Url(new Uint8Array(await crypto.subtle.sign(getAlgorithm(alg), key, encoder.encode(signingInput))));
}
