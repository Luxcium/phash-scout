import { S } from '../types';
import { immediateZalgo } from '../utils';

export function bigString(str: S): S;
export function bigString(str: Promise<S>): Promise<S>;
export function bigString(str: S | Promise<S>): S | Promise<S> {
  if (typeof str === 'object' && str instanceof Promise) return immediate(str);

  return bigString_(str);
}

async function immediate(str: Promise<S>): Promise<S> {
  try {
    return immediateZalgo(bigString_(await str));
  } catch (error) {
    console.error(
      '>     \u009B31mFailed Silently in: immediate ~~>bigString_(await str)\u0007 \u009B0m',
      error
    );
    // throw new Error(error as any);
  }
  return '';
}
function bigString_(str: S): S {
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
