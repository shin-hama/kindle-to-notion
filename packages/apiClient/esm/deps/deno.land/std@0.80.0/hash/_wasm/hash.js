// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hash_hash, _Hash_digested;
import init, { source, create_hash as createHash, update_hash as updateHash, digest_hash as digestHash, } from "./wasm.js";
import * as hex from "../../encoding/hex.js";
import * as base64 from "../../encoding/base64.js";
await init(source);
const TYPE_ERROR_MSG = "hash: `data` is invalid type";
export class Hash {
    constructor(algorithm) {
        _Hash_hash.set(this, void 0);
        _Hash_digested.set(this, void 0);
        __classPrivateFieldSet(this, _Hash_hash, createHash(algorithm), "f");
        __classPrivateFieldSet(this, _Hash_digested, false, "f");
    }
    /**
     * Update internal state
     * @param data data to update
     */
    update(data) {
        let msg;
        if (typeof data === "string") {
            msg = new TextEncoder().encode(data);
        }
        else if (typeof data === "object") {
            if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
                msg = new Uint8Array(data);
            }
            else {
                throw new Error(TYPE_ERROR_MSG);
            }
        }
        else {
            throw new Error(TYPE_ERROR_MSG);
        }
        updateHash(__classPrivateFieldGet(this, _Hash_hash, "f"), msg);
        return this;
    }
    /** Returns final hash */
    digest() {
        if (__classPrivateFieldGet(this, _Hash_digested, "f"))
            throw new Error("hash: already digested");
        __classPrivateFieldSet(this, _Hash_digested, true, "f");
        return digestHash(__classPrivateFieldGet(this, _Hash_hash, "f"));
    }
    /**
     * Returns hash as a string of given format
     * @param format format of output string (hex or base64). Default is hex
     */
    toString(format = "hex") {
        const finalized = new Uint8Array(this.digest());
        switch (format) {
            case "hex":
                return hex.encodeToString(finalized);
            case "base64":
                return base64.encode(finalized);
            default:
                throw new Error("hash: invalid format");
        }
    }
}
_Hash_hash = new WeakMap(), _Hash_digested = new WeakMap();
