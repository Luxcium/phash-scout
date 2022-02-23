import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { CurrentPath } from './CurrentPath';

export interface IQueryListPhash {
  list: [path: S, id: N, radius: S][];
}

export type P<T> = Promise<T>;
export type S = string;
export type N = number;
export type TX = Promise<{
  transact:
    | Promise<null>
    | Promise<{
        rawQueryResult: Promise<null | RedisCommandRawReply>;
        addResult: Promise<null | RedisCommandRawReply>;
      }>;
  path: CurrentPath;
  pHash: {
    willPhash_: () => Promise<S | null>;
    index: N;
    value: null | string;
  };
}>;

/*
Promise<{
    transact: Promise<null>;
    path: CurrentPath;
    pHash: {
        willPhash_: () => Promise<string | null>;
        index: number;
        value: null;
    };
} | {
    transact: P<...>;
    path: CurrentPath;
    pHash: {
        ...;
    };
}>
 */
