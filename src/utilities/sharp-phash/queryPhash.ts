import { QUERY, RADIUS3 } from './constants';
import type { S } from './IQueryListPhash';

export async function queryPhash(R: any, k: S, phash_: S) {
  return R.sendCommand([QUERY, k, phash_, RADIUS3]);
}
