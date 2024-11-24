import { decodeHex, encodeHex, } from "../deps/deno.land/std@0.224.0/encoding/hex.js";
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
async function generateKey(password, salt) {
    const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    return crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
    }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
export async function encrypt(raw, encryptionKey) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const key = await generateKey(encryptionKey, salt);
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, new TextEncoder().encode(raw));
    const encryptedArray = new Uint8Array(encrypted);
    const result = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(encryptedArray, salt.length + iv.length);
    return encodeHex(result);
}
export async function decrypt(encryptedData, encryptionKey) {
    const data = decodeHex(encryptedData);
    const salt = data.slice(0, SALT_LENGTH);
    const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const encrypted = data.slice(SALT_LENGTH + IV_LENGTH);
    const key = await generateKey(encryptionKey, salt);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
    return new TextDecoder().decode(decrypted);
}
