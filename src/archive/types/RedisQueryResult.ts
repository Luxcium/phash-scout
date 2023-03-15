import { FileType } from '../tools';
import { CurrentPathError } from './complex-types';
import { GetStats } from './GetStats';
import { PathAndStats } from './PathAndStats';
import { PathWithStats } from './PathWithStats';
import { QueryResultObject } from './QueryResultObject';
import { IsNotValidPHash, IsValidPHash } from './ValidPHash';
import { IsExcluded, NotExcluded } from './WithExclude';

export type RedisQueryResult<Bool extends boolean = true | false> = {
  baseName: string;
  dir: string;
  exclude: Bool;
  ext: string;
  extname: string;
  fileName: string;
  fullPath: string;
  type: FileType;
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
  getStats: () => Promise<GetStats>;
  getPHash: () => Promise<
    (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
  >;
  queryResult: () => Promise<QueryResultObject[] | null>;
};
