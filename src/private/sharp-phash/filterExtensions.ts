import { validExts } from '../../constants/validExts';
import { PathWithStats } from '../../packages/file-path/types';
import { Bg } from '../../packages/file-path/types/Bg';
import { immediateZalgo } from '../../utilities/utils';

export function filterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<Promise<PathWithStats>>) => Bg<Promise<PathWithStats>> {
  return <T extends PathWithStats>(list: Bg<Promise<T>>) =>
    filterExts(list, validExt);
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

export function newFilterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<PathWithStats>) => Bg<PathWithStats> {
  return <T extends PathWithStats>(list: Bg<T>) =>
    newFilterExts(list, validExt);
}

export function newFilterExts<T extends PathWithStats>(
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
/*
function<T extends PathWithStats>(list: Bg<Promise<T>>): Bg<Promise<T>>
 */
