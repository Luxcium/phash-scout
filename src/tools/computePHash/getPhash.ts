import { computePHash } from '..';
import { Bg, PathWithStats, PHashGetter } from '../../types';

// export function getPhash<T extends PathWithStats>(
//   pathWithStatsBgList: Bg<T>
// ): Bg<T & PathWithStats & { getPHash: PHashGetter }> {
//   return pathWithStatsBgList.map(paths => computePHash(paths));
// }

export function getPhash<T extends PathWithStats>(
  pathWithStatsBgList: Bg<T>
): Bg<T & PathWithStats & { getPHash: PHashGetter }> {
  return pathWithStatsBgList.map(paths => computePHash(paths));
}
