import { QUERY } from '.';
import type { S } from '../../../core/types/IQueryListPhash';
import { RADIUS } from '../constants';
import { syncPhash } from './syncPhash';

export async function queryPhash(
  R: any,
  k: S,
  phash_: S,
  radius: string = RADIUS,
  failSilently = true
) {
  try {
    if (R.EXISTS(k) === 1) {
      await syncPhash(R, k);
      const result = R.sendCommand([QUERY, k, phash_, radius]);
      return result;
    }
  } catch (error: any) {
    if (!failSilently) {
      throw new Error('queryPhash' + error);
    }
    console.error('queryPhash Failled silently');
  }
  return [];
}
