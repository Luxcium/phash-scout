import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { P, S } from '../../core/types/IQueryListPhash';
import { ADD } from './constants';

export async function addPhash(
  R: any,
  k: S,
  p: S,
  t: S
): P<RedisCommandRawReply> {
  return R.sendCommand([ADD, k, p, t]);
}
