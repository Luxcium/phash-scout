import { doUniqueAddObj } from './doUniqueAddObj';
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

        return notNull(_path.pHash) && notExcluded(_path)
          ? doUniqueAddObj(R, key, _path)
          : null;
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
