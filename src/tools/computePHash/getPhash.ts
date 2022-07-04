import { Bg, PathWithStats, PHashGet } from '../../types';
import { makePHashGetter } from './makePHashGetter';

export function getPhash<T extends PathWithStats>(
  pathWithStatsBgList: Bg<T>
): Bg<T & PHashGet> {
  return pathWithStatsBgList.map(paths => ({
    ...paths,
    await: { ...makePHashGetter<T>(paths).await },
  }));
}
