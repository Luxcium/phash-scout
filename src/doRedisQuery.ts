import { statSync } from 'fs-extra';
import { uniqueAddToObj } from './commands';
import { titleBuilder } from './titleBuilder';
import { notExcluded, notNull } from './tools/notExclude';
import {
  Bg,
  CurrentPathError,
  Excluded,
  FilePathInfo,
  GetStats,
  IsExcluded,
  IsNotValidPHash,
  IsValidPHash,
  NotExcluded,
  PathAndStats,
  PathWithStats,
  QueryResultObject,
  ValidPHash,
} from './types';

export function doRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      PathWithStats & {
        getPHash: () => Promise<
          | (Excluded<false> & ValidPHash<true>)
          | (Excluded<true> & ValidPHash<false>)
        >;
      }
    >
  ) => {
    return bgPaths.map(paths => {
      const queryResult = async () => {
        const _path = { ...paths, ...(await paths.getPHash()) };
        if (notNull(_path.pHash) && notExcluded(_path)) {
          const stats = statSync(_path.fullPath);
          const phash_ = _path.pHash;

          return uniqueAddToObj({
            R,
            title: titleBuilder({ ..._path, ...stats, key }),
            phash_,
            radius: '0',
            k: key,
          });
        }
        return null;
      };
      const strange: {
        getChild: () => Promise<
          PathWithStats | PathAndStats | CurrentPathError
        >[];
        getStats: () => Promise<GetStats>;
        getPHash: () => Promise<
          (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
        >;
        queryResult: () => Promise<QueryResultObject[] | null>;
      } & FilePathInfo<boolean> = {
        ...paths,
        queryResult,
      };
      return strange;
    });
  };
}
