import { CurrentPath, FALSY } from '.';
import {
  PQuerryAndAdd,
  QueryResultItem,
} from '../../utilities/sharp-phash/isQueryResultItem';
import { N, S } from './IQueryListPhash';

export type TX = Promise<{
  transact: Promise<QueryResultItem[]>;
  path: CurrentPath;
  pHash: {
    willPhash_?: () => Promise<S | null>;
    index: N;
    value: null | string;
  };
  pQuerryAndAdd?: PQuerryAndAdd;
}>;

export type Tx = Promise<{
  transact: FALSY | Promise<QueryResultItem[]>;
  path: FALSY | CurrentPath;
  pHash:
    | FALSY
    | {
        willPhash_?: () => Promise<S | null>;
        index: N;
        value: null | string;
      };
  pQuerryAndAdd?: FALSY | PQuerryAndAdd;
}>;
