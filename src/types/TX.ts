// /home/luxcium/projects/parallel-mapping/src/utilities/files/file-path/types/index.ts
// /home/luxcium/projects/parallel-mapping/src/../../utilities/files/file-path/types
import { CurrentPath } from './FileCurrentPath';
import { PQuerryAndAdd } from './PQuerryAndAdd';
import { QueryResultItem } from './QueryResultItem';

export type TX = Promise<{
  transact: Promise<QueryResultItem[]>;
  path: CurrentPath;
  pHash: {
    willPhash_?: () => Promise<string | null>;
    index: number;
    value: null | string;
  };
  pQuerryAndAdd?: PQuerryAndAdd;
}>;
