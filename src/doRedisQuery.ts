import { statSync } from 'fs-extra';
import { uniqueAddToObj } from './commands';
import { titleBuilder } from './titleBuilder';
import { notExcluded, notNull } from './tools/notExclude';
import {
  Bg,
  CurrentPathError,
  FilePathInfo,
  GetStats,
  PathAndStats,
  PathWithStats,
  PHashGet,
  PHashGetter,
  QueryResultObject,
} from './types';

export type MyReturnType = (bgPaths: Bg<PathWithStats & PHashGet>) => Bg<
  {
    getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
    getStats: () => Promise<GetStats>;
    await: {
      getPHash: PHashGetter;
    };
    queryResult: () => Promise<QueryResultObject[] | null>;
  } & FilePathInfo<boolean>
>;
export function doRedisQuery(
  R: any,

  key: string
) {
  return (bgPaths: Bg<PathWithStats & PHashGet>) => {
    return bgPaths.map(paths => {
      const queryResult = async () => {
        const _path = { ...paths, ...(await paths.await.getPHash()) };
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
        await: {
          getPHash: PHashGetter;
        };
        queryResult: () => Promise<QueryResultObject[] | null>;
      } & FilePathInfo<boolean> = {
        ...paths,
        queryResult,
      };
      return strange;
    });
  };
}
