import { QueryResultItem } from '../../utilities/sharp-phash/isQueryResultItem';
import { CurrentPath } from './CurrentPath';

export interface IQueryListPhash {
  list: [path: S, id: N, radius: S][];
}

export type P<T> = Promise<T>;
export type S = string;
export type N = number;
export type TX = Promise<{
  transact: Promise<QueryResultItem[]>;
  path: CurrentPath;
  pHash: {
    willPhash_: () => Promise<S | null>;
    index: N;
    value: null | string;
  };
}>;
