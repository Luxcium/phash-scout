import type { Bg } from '@luxcium/boxed-list';
import { PathWithStats } from '@types';

import { validExts } from '../../constants/validExts';

export function filterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<PathWithStats>) => Bg<PathWithStats> {
  return <T extends PathWithStats>(list: Bg<T>) => filterExts(list, validExt);
}

function filterExts<T extends PathWithStats>(
  list: Bg<T>,
  validExt: Set<string> = validExts
): Bg<T> {
  return list.map(i => {
    const { ext } = i;
    return {
      ...i,
      exclude: i.exclude || !validExt.has(ext),
    };
  });
}
