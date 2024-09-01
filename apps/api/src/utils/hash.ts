import { str as fromStr } from 'adler-32';

export const hash = (data: string): string => {
  return fromStr(data).toString(16);
};
