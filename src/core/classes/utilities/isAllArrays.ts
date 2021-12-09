import { isArray } from '.';

export function isAllArrays<T>(specimen: T[]) {
  return specimen.every(isArray);
}
