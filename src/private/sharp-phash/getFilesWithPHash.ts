import { BoxedGenerator } from '@luxcium/boxed-list';
import { immediateZalgo } from '../..';
import { notExcluded } from '../../packages/file-path/tools/notExclude';
import type {
  Excluded,
  PathAndStats,
  PathWithStats,
  WithCount,
  WithExclude,
  WithIndex,
  WithPHash,
} from '../../packages/file-path/types';
import { Bg } from '../../packages/file-path/types/Bg';
import { phashNow } from '../../packages/phash-now/phashNow';
import { listFiles } from './listFiles';
import { validExts } from './__sharp-phash-working';

type Pr<T> = Promise<T>;
export const filterExtensions =
  (validExt: Set<string> = validExts) =>
  <T extends PathWithStats>(list: Bg<Promise<T>>) =>
    filterExts(list, validExt);
export const getPhash = <T extends PathWithStats>(list: Bg<Promise<T>>) =>
  getPHash(list);
export function getFilesWithPHash(
  folder: string,
  withStats: true,
  validExt?: Set<string>
): Bg<Promise<PathAndStats & WithExclude & WithPHash & WithCount>>;
export function getFilesWithPHash(
  folder: string,
  withStats: false,
  validExt?: Set<string>
): Bg<Promise<PathWithStats & WithExclude & WithPHash & WithCount>>;
export function getFilesWithPHash(
  folder: string,
  withStats: boolean = false,
  validExt: Set<string> = validExts
): Bg<
  Promise<(PathWithStats | PathAndStats) & WithExclude & WithPHash & WithCount>
> {
  // const fext = <T extends PathWithStats>(list: Bg<Promise<T>>) =>
  //   filterExts(list, validExt);
  // const gPhsh = <T extends PathWithStats>(list: Bg<Promise<T>>) =>
  //   getPHash(list);

  if (withStats) {
    return getPhash(filterExtensions(validExt)(listFiles(folder, true)));
  }
  return getPhash(filterExtensions(validExt)(listFiles(folder, false)));
}

export function filterExts<T extends PathWithStats>(
  list: Bg<Promise<T>>,
  validExt: Set<string> = validExts
): Bg<Promise<T>> {
  return list.map(async i => {
    const awaited_i = await i;
    const { ext } = awaited_i;
    return immediateZalgo({
      ...awaited_i,
      exclude: awaited_i.exclude || !validExt.has(ext),
    });
  });
}

export function getPHash<T extends PathWithStats>(
  list: BoxedGenerator<Promise<T>>
): Bg<Pr<T & WithExclude & WithPHash & WithCount>> {
  const count = { index1: 0 };
  return list.map(async (paths, index) => {
    const currentPath = await paths;
    if (notExcluded(currentPath)) {
      const { phash } = phashNow(currentPath, index || 0);
      // const {index} = phash
      const hash = await phash.get();
      if (typeof hash === 'string') {
        const result: Excluded<false> &
          PathWithStats &
          WithPHash &
          WithIndex &
          WithCount = {
          pHash: hash,
          ...currentPath,
          count: count.index1++,
          index: index || 0,
        };
        return result;
      }
    }
    const count1 = count.index1++;
    const result: Excluded<true> & PathWithStats & WithPHash & WithCount = {
      pHash: null,
      ...currentPath,
      exclude: true,
      count: count1,
    };
    return result;
  });
}

/*

const result: IsExcluded & WithFileName & WithPathToFile & WithFileExtname & WithFullPath & WithExtname & WithExt & WithFileType & {
    getStats: () => Promise<GetStats>;
    getChild: () => Promise<PathWithStats | CurrentPathError | PathAndStats>[];
} & WithPHash & WithCount

IsExcluded | NotExcluded
const result: NotExcluded & WithFileName & WithPathToFile & WithFileExtname & WithFullPath & WithExtname & WithExt & WithFileType & {
    getStats: () => Promise<GetStats>;
    getChild: () => Promise<PathWithStats | CurrentPathError | PathAndStats>[];
} & WithPHash & WithCount

return pHashesBGen.map(async (hash: Promise<PHashedPath>) => {
    const { path, phash } = await hash;
    const phash_ = await phash.get();
    return { phash_, ...path, i: phash.index, count: count.index1++ };
     });

     : BoxedGenerator<
  Promise<
    | ({
        pHash: string;
      } & T &
        Excluded<false>)
    | ({
        pHash: null;
      } & T)
  >
>


 */
// filteredExts.map(async (paths, index) => {
//   return phashNow(await paths, index || 0);
// }); //WithExclude

// count.index1 = 1;
// const filesPathList = withStats
//   ? pathList.map<P<PathAndStats>>(async i => {
//       const { fullPath } = await i;
//       return immediateZalgo<PathAndStats>({
//         ...(await i),
//         ...(await stat(fullPath)),
//       });
//     })
//   : pathList.map<P<PathWithStats>>(async i => immediateZalgo(i));

/*
+ Extension Validation

const filteredExts: Bg<P<PathWithStats>> = filesPathList.map(async i => {
    const awaited_i = await i;
    const { ext } = awaited_i;
    return immediateZalgo({
      ...awaited_i,
      exclude: awaited_i.exclude || !validExts.has(ext),
    });
  });
+ pHashing
  const pHashesBGen = filteredExts.map(async (paths, index) => {
    return phashNow(await paths, index || 0);
  });

  return pHashesBGen.unbox();

 */
/*

  const pHashesBGen = filteredExts.map(async (paths, index) => {
    return phashNow(await paths, index || 0);
  });

 return pHashesBGen.map(async (hash: Promise<PHashedPath>) => {
    const { path, phash } = await hash;
    const phash_ = await phash.get();
    return { phash_, ...path, i: phash.index, count: count.index1++ };
     });
 */
