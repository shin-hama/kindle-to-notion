import { createHash } from "https://deno.land/std@0.80.0/hash/mod.ts";

export const hash = (data: string): string => {
  const _hash = createHash("md5");
  return _hash.update(new TextEncoder().encode(data)).toString();
};
