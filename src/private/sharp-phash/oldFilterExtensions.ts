import { validExts } from '../../constants/validExts';
import { PathWithStats } from '../../private/file-path/types';
import { Bg } from '../../private/file-path/types/Bg';
import { oldFilterExts } from './oldFilterExts';

export function oldFilterExtensions(
  validExt: Set<string> = validExts
): (list: Bg<Promise<PathWithStats>>) => Bg<Promise<PathWithStats>> {
  return <T extends PathWithStats>(list: Bg<Promise<T>>) =>
    oldFilterExts(list, validExt);
}
