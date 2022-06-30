import { QueryResultObject } from '../types';
import { CurrentPathError } from './complex-types';
import { FilePathInfo } from './FilePathInfo';
import { GetStats } from './GetStats';
import { PathAndStats } from './PathAndStats';
import { PathWithStats } from './PathWithStats';
import { IsNotValidPHash, IsValidPHash } from './ValidPHash';
import { IsExcluded, NotExcluded } from './WithExclude';

export type Strange<Bool extends boolean = true | false> = {
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
  getStats: () => Promise<GetStats>;
  pHashValue: () => Promise<
    (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
  >;
  queryResult: () => Promise<QueryResultObject[] | null>;
} & FilePathInfo<Bool>;
