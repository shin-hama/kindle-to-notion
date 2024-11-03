import { createHash } from "../../deps/deno.land/std@0.80.0/hash/mod.js";
export const hash = (data) => {
    const _hash = createHash("md5");
    return _hash.update(new TextEncoder().encode(data)).toString();
};
