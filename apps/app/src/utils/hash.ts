import { Xxh32 } from '@node-rs/xxhash';

export const hash = (data: string): string => {
  return new Xxh32().update(data).digest().toString(16);
};
