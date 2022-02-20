import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';

export interface IQueryListPhash {
  list: [path: S, id: N, radius: S][];
}

export type P<T> = Promise<T>;
export type S = string;
export type N = number;
export type TX = P<{
  transact: P<{
    rawQueryResult: P<null | RedisCommandRawReply>;
    addResult: P<null | RedisCommandRawReply>;
  }>;
  name: S;
  phash_: S;
  path: S;
  index: number;
}>;