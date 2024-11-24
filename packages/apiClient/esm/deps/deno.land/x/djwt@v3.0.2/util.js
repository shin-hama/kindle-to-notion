export const encoder = new TextEncoder();
export const decoder = new TextDecoder();
export function isArray(input) {
    return Array.isArray(input);
}
export function isDefined(input) {
    return input !== undefined;
}
export function isNotNull(input) {
    return input !== null;
}
export function isNotNumber(input) {
    return typeof input !== "number";
}
export function isNotString(input) {
    return typeof input !== "string";
}
export function isNull(input) {
    return input === null;
}
export function isNumber(input) {
    return typeof input === "number";
}
export function isNotTrue(input) {
    return input !== true;
}
export function isObject(input) {
    return (input !== null && typeof input === "object" &&
        Array.isArray(input) === false);
}
export function isString(input) {
    return typeof input === "string";
}
export function isUndefined(input) {
    return input === undefined;
}
