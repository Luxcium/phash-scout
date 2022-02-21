import type { S } from '../../core/types/IQueryListPhash';
import { QUERY, RADIUS3 } from './constants';

export async function queryPhash(R: any, k: S, phash_: S) {
  return R.sendCommand([QUERY, k, phash_, RADIUS3]);
}
