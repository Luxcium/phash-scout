import { QUERY } from '.';
import type { S } from '../../../core/types/IQueryListPhash';
import { RADIUS } from '../constants';

export async function queryPhash(
  R: any,
  k: S,
  phash_: S,
  radius: string = RADIUS,
  failSilently = true
) {
  try {
    const result = R.sendCommand([QUERY, k, phash_, radius]);
    console.log(QUERY, await result);
    return result;
  } catch (error) {
    if (!failSilently) {
      console.error(error);
    }
  }
  return [];
}
