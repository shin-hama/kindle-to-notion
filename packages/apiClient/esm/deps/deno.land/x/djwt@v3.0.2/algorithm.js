import { isNotNull, isString } from "./util.js";
// Still needs an 'any' type! Does anyone have an idea?
// https://github.com/denoland/deno/blob/main/ext/crypto/lib.deno_crypto.d.ts
function isHashedKeyAlgorithm(
// deno-lint-ignore no-explicit-any
algorithm) {
    return isString(algorithm.hash?.name);
}
function isEcKeyAlgorithm(
// deno-lint-ignore no-explicit-any
algorithm) {
    return isString(algorithm.namedCurve);
}
export function verify(alg, key) {
    if (alg === "none") {
        if (isNotNull(key)) {
            throw new Error(`The alg '${alg}' does not allow a key.`);
        }
        else
            return true;
    }
    else {
        if (!key)
            throw new Error(`The alg '${alg}' demands a key.`);
        const keyAlgorithm = key.algorithm;
        const algAlgorithm = getAlgorithm(alg);
        if (keyAlgorithm.name === algAlgorithm.name) {
            if (isHashedKeyAlgorithm(keyAlgorithm)) {
                return keyAlgorithm.hash.name === algAlgorithm.hash.name;
            }
            else if (isEcKeyAlgorithm(keyAlgorithm)) {
                return keyAlgorithm.namedCurve === algAlgorithm.namedCurve;
            }
        }
        return false;
    }
}
export function getAlgorithm(alg) {
    switch (alg) {
        case "HS256":
            return { hash: { name: "SHA-256" }, name: "HMAC" };
        case "HS384":
            return { hash: { name: "SHA-384" }, name: "HMAC" };
        case "HS512":
            return { hash: { name: "SHA-512" }, name: "HMAC" };
        case "PS256":
            return {
                hash: { name: "SHA-256" },
                name: "RSA-PSS",
                saltLength: 256 >> 3,
            };
        case "PS384":
            return {
                hash: { name: "SHA-384" },
                name: "RSA-PSS",
                saltLength: 384 >> 3,
            };
        case "PS512":
            return {
                hash: { name: "SHA-512" },
                name: "RSA-PSS",
                saltLength: 512 >> 3,
            };
        case "RS256":
            return { hash: { name: "SHA-256" }, name: "RSASSA-PKCS1-v1_5" };
        case "RS384":
            return { hash: { name: "SHA-384" }, name: "RSASSA-PKCS1-v1_5" };
        case "RS512":
            return { hash: { name: "SHA-512" }, name: "RSASSA-PKCS1-v1_5" };
        case "ES256":
            return { hash: { name: "SHA-256" }, name: "ECDSA", namedCurve: "P-256" };
        case "ES384":
            return { hash: { name: "SHA-384" }, name: "ECDSA", namedCurve: "P-384" };
        // case "ES512":
        // return { hash: { name: "SHA-512" }, name: "ECDSA", namedCurve: "P-521" };
        default:
            throw new Error(`The jwt's alg '${alg}' is not supported.`);
    }
}
