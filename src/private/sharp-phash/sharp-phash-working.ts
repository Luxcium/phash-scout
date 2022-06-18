import fs, { statSync } from 'fs';
import { isArray } from '../../core/utils';
import { notExcluded, notNull } from '../../private/file-path/tools/notExclude';
import type {
  Bg,
  CurrentPathError,
  Excluded,
  GetStats,
  IsExcluded,
  IsNotValidPHash,
  IsValidPHash,
  NotExcluded,
  PathAndStats,
  PathWithStats,
  ValidPHash,
  WithBaseName,
  WithDir,
  WithExtname,
  WithFullPath,
  WithPHash,
} from '../../private/file-path/types';
import { FileType, WithExclude } from '../../private/file-path/types';
import { immediateZalgo } from '../../utilities/utils';
import { QueryResultItem, QueryResultObject } from '../img-scout/types';
import { uniqueAddToObj } from '../img-scout/uniqueAddToObj';
import { Strange } from './types';

const humanSize = require('human-size');

export const count = { index1: 1 };

export function oldDoRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      Promise<
        WithDir &
          WithFullPath &
          WithBaseName &
          WithExtname &
          WithExclude &
          WithPHash
      >
    >
  ): Bg<Promise<Strange>> => {
    return bgPaths.map(async awtPaths => {
      const paths = await awtPaths;
      let getQueryResult = (): any => null;
      let queryResult: Array<QueryResultItem | QueryResultObject> | null = null;

      if (notNull(paths.pHash) && notExcluded(paths)) {
        const stats = statSync(paths.fullPath);
        const phash_ = paths.pHash;
        queryResult = await uniqueAddToObj({
          R,
          title: titleBuilder({ ...paths, ...stats, key }),
          phash_,
          radius: '0',
          k: key,
        });
        getQueryResult = () => queryResult;
      }
      const strange: Strange = {
        queryResult,
        ...paths,
        getQueryResult,
      };
      return immediateZalgo(strange);
    });
  };
}

export function doRedisQuery(
  R: any,

  key: string
) {
  return (
    bgPaths: Bg<
      PathWithStats & {
        pHashValue: () => Promise<
          | (Excluded<false> & ValidPHash<true>)
          | (Excluded<true> & ValidPHash<false>)
        >;
      }
    >
  ) => {
    return bgPaths.map(paths => {
      const queryResult = async () => {
        const _path = { ...paths, ...(await paths.pHashValue()) };
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
      const strange: NewStrange<true | false> = {
        ...paths,
        queryResult,
      };
      return strange;
    });
  };
}

const count2 = { a1: 0, b: 0, len: 0 };

export type FilePath<Bool extends boolean = true | false> = {
  fileName: string;
  extname: string;
  baseName: string;
  fullPath: string;
  dir: string;
  ext: string;
  exclude: Bool;
  type: FileType;
};
export type NewStrange<Bool extends boolean = true | false> = {
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
  getStats: () => Promise<GetStats>;
  pHashValue: () => Promise<
    (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
  >;
  queryResult: () => Promise<QueryResultObject[] | null>;
} & FilePath<Bool>;

export function manageRedisQuery(bgItem: Bg<NewStrange<true | false>>) {
  return bgItem.map(async (item, indx) => {
    try {
      if (notExcluded(item)) {
        const { queryResult: qrFn, ...awaited } = item;
        const queryResult = await qrFn();
        if (queryResult) {
          const result = {
            queryResult, //: queryResult.reverse(),
            ...awaited,
          };
          count2.a1 = 0;
          result.queryResult.map(
            (qrItem, _, a) =>
              count2.a1++ === 0 &&
              console.log(
                qrItem,
                (indx || 0) + 1,
                (qrItem as QueryResultObject).radius === '0' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/0/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-5' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-5/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-10' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-10/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length === 1 &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/ln1/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-15' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-15/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length,
                _
              )
          );
          return result.queryResult;
        }
      }
    } catch (error) {
      console.error('in boxedGenerator3', error);
    }
    return item;
  });
}

function linkSync(existingPath: string, newPath: string) {
  if (!fs.existsSync(newPath)) {
    fs.linkSync(existingPath, newPath); //tmp/blue/1654566738095
    return true;
  }
  return false;
}

function titleBuilder({
  key,
  size,
  dir,
  baseName,
  extname,
}: {
  key: string;
  size: number;
  dir: string;
  baseName: string;
  extname: string;
}) {
  return `${key}:${
    size > 0 ? humanSize(size, 2) || 0 : 0
  }:${size}:${dir}:${baseName}:${extname.split('.').slice(1).join('')}`;
}
export function describeMapping<T>(fn: <R>(val: T) => R) {
  return (mapable: T[] | Bg<T>) => {
    if (isArray(mapable)) {
      return mapable.map(fn);
    }
    return mapable.map(fn);
  };
}

export function composer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T) => fn1(fn2(x));
}
export function piper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T) => fn2(fn1(x));
}

export const le2n: (x: string) => number = composer(
  (n: number) => n * 2,
  (t: string) => t.length
);
export const le4n: (x: string) => number = composer((n: number) => n * 2, le2n);

export const len2: (x: string) => number = piper(
  (t: string) => t.length,
  (n: number) => n * 2
);
export const len4: (x: string) => number = piper(len2, (n: number) => n * 2);

export function listComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: T[]) => x.map(fn2).map(fn1);
}
export function listPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: T[]) => x.map(fn1).map(fn2);
}

export function bgPiper<T, A, R>(fn1: (val: T) => A, fn2: (val: A) => R) {
  return (x: Bg<T>) => x.map(fn1).map(fn2);
}
export function bgComposer<T, A, R>(fn1: (val: A) => R, fn2: (val: T) => A) {
  return (x: Bg<T>) => x.map(fn2).map(fn1);
}
