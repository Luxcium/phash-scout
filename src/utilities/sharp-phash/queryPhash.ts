import type { S } from '../../core/types/IQueryListPhash';
import { QUERY, RADIUS } from './constants';

export async function queryPhash(
  R: any,
  k: S,
  phash_: S,
  radius: string = RADIUS
) {
  return R.sendCommand([QUERY, k, phash_, radius]);
}
