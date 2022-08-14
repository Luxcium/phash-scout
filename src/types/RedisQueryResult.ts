import {
  CurrentPathError,
  FileType,
  GetStats,
  IsExcluded,
  IsNotValidPHash,
  IsValidPHash,
  NotExcluded,
  PathAndStats,
  PathWithStats,
  QueryResultObject,
} from '.';

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
