import { S } from '../types';

export function bigString(str: S): S {
  const strSplit = [...str];

  if (
    strSplit.length === 64 &&
    strSplit.every(bit => bit === '1' || bit === '0')
  ) {
    return BigInt(`0b${str}`).toString();
  }

  throw new Error(
    'Something bad happened! Because the string was not 64 bit \'("0" | "1")\' long'
  );
}
