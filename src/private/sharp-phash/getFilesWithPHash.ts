import { BoxedGenerator } from '@luxcium/boxed-list';
import { validExts } from '../../constants/validExts';
import { immediateZalgo } from '../../core/utils';
import { notExcluded } from '../../private/file-path/tools/notExclude';
import {
  Excluded,
  PathAndStats,
  PathWithStats,
  ValidPHash,
  WithExclude,
  WithPHash,
} from '../../private/file-path/types';
import { Bg } from '../../private/file-path/types/Bg';
import { phashNow } from '../phash-now/phashNow';
import { filterExtensions } from './filterExtensions';
import { listFiles } from './listFiles';

type Pr<T> = Promise<T>;
export const getPhash = <T extends PathWithStats>(list: Bg<Promise<T>>) =>
  getPHash(list);

export const newGetPhash = <T extends PathWithStats>(list: Bg<T>) =>
  newGetPHash(list);
export function getFilesWithPHash(
  folder: string,
  withStats: true,
  validExt?: Set<string>
): Bg<Promise<PathAndStats & WithExclude & WithPHash>>;
export function getFilesWithPHash(
  folder: string,
  withStats: false,
  validExt?: Set<string>
): Bg<Promise<PathWithStats & WithExclude & WithPHash>>;
export function getFilesWithPHash(
  folder: string,
  withStats: boolean = false,
  validExt: Set<string> = validExts
): Bg<Promise<(PathWithStats | PathAndStats) & WithExclude & WithPHash>> {
  if (withStats) {
    return getPhash(filterExtensions(validExt)(listFiles(folder, true)));
  }
  return getPhash(filterExtensions(validExt)(listFiles(folder, false)));
}

export function getPHash<T extends PathWithStats>(
  list: BoxedGenerator<Promise<T>>
): Bg<Pr<T & WithExclude & WithPHash>> {
  return list.map(async paths => computePHash(paths));
}

export function newGetPHash<T extends PathWithStats>(
  list: Bg<T>
): Bg<
  T &
    PathWithStats & {
      pHashValue: () => Promise<
        | (Excluded<false> & ValidPHash<true>)
        | (Excluded<true> & ValidPHash<false>)
      >;
    }
> {
  return list.map(paths => newComputePHash(paths));
}
export async function computePHash<T extends PathWithStats>(paths: Promise<T>) {
  const currentPath = await paths;
  if (notExcluded(currentPath)) {
    const { phash } = phashNow(currentPath);
    const hash = await phash.get();
    if (typeof hash === 'string') {
      const result: Excluded<false> & PathWithStats & WithPHash = {
        pHash: hash,
        ...currentPath,
      };
      return result;
    }
  }
  const result: Excluded<true> & PathWithStats & WithPHash = {
    pHash: null,
    ...currentPath,
    exclude: true,
  };
  return result;
}

export function newComputePHash<T extends PathWithStats>(paths: T) {
  const result: PathWithStats & {
    pHashValue: () => Promise<
      | (Excluded<false> & ValidPHash<true>)
      | (Excluded<true> & ValidPHash<false>)
    >;
  } = {
    ...paths,
    pHashValue: async () => {
      if (notExcluded(paths)) {
        const { phash } = phashNow(paths);
        const hash = await phash.get();
        if (typeof hash === 'string') {
          return immediateZalgo({
            pHash: hash,
            exclude: false,
          });
        }
      }
      return immediateZalgo({
        pHash: null,
        exclude: true,
      });
    },
  };
  return result;
}
