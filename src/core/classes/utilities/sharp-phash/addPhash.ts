import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { ADD } from './constants';
import { P, S } from './IQueryListPhash';

export async function addPhash(
  R: any,
  k: S,
  p: S,
  t: S
): P<RedisCommandRawReply> {
  return R.sendCommand([ADD, k, p, t]);
}
