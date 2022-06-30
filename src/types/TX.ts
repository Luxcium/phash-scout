import { CurrentPath, N, QueryResultItem, S } from '.';
// /home/luxcium/projects/parallel-mapping/src/utilities/files/file-path/types/index.ts
// /home/luxcium/projects/parallel-mapping/src/../../utilities/files/file-path/types
import { PQuerryAndAdd } from './PQuerryAndAdd';

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

// export type Tx = Promise<{
//   transact: FALSY | Promise<QueryResultItem[]>;
//   path: FALSY | CurrentPath;
//   pHash:
//     | FALSY
//     | {
//         willPhash_?: () => Promise<S | null>;
//         index: N;
//         value: null | string;
//       };
//   pQuerryAndAdd?: FALSY | PQuerryAndAdd;
// }>;
