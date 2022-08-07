import { parse } from 'node:path';

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
} from '../types';
import { doUniqueAddObj } from './doUniqueAddObj';
import { notExcluded, notNull } from './notExclude';

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
    return bgPaths.map(paths => doEachRedisQuery(paths, R, key));
  };
}

function doEachRedisQuery(
  paths: PathWithStats & PHashGet,
  R: any,

  key: string
) {
  const queryResult = async () => {
    const _path = { ...paths, ...(await paths.await.getPHash()) };

    return notNull(_path.pHash) && notExcluded(_path)
      ? doUniqueAddObj(R, key, _path)
      : null;
  };
  const strange: {
    getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
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
}

export function redisQuery(
  R: any,
  key: string,
  fullPath: string,
  pHash: Promise<string>
) {
  const path = parse(fullPath);
  const pathInfos = {
    ...path,
    fullPath,
    extname: path.ext.toLowerCase(),
    baseName: path.base,
  };
  const queryResult = async () => {
    return doUniqueAddObj(await R, key, {
      ...pathInfos,
      pHash: (await pHash) || '0',
    });
  };

  return { queryResult, ...pathInfos };
}

/*

>=
= == ===
{
    fullPath,
    pHash,
    dir,
    baseName,
    extname,
  }: {
    fullPath: string;
    pHash: string;
    dir: string;
    baseName: string;
    extname: string;
  }
) {
  const stats = statSync(fullPath);
  const title = titleBuilder({ dir, baseName, extname, ...stats, key });
  const result = uniqueAddToObj({
    R,
    title,
    phash_: pHash,
    radius: '0',
    k: key,
  });
  return result; */
