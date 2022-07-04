import { BoxedGenerator } from '@luxcium/boxed-list';
import type { Bg, PathAndStats, PathWithStats } from './types';
import { FileTypeInfos } from './types/FileTypeInfos';
import { getPathWithStats } from './utils';
import { newGetPathWithStats } from './utils/getPathWithStats';

export function old_listFiles(
  folder: string,
  withStats?: false
): Bg<Promise<PathWithStats>>;
export function old_listFiles(
  folder: string,
  withStats: true
): Bg<Promise<PathAndStats>>;
export function old_listFiles(
  folder: string,
  withStats?: boolean
): Bg<Promise<PathWithStats>>;
export function old_listFiles(
  folder: string,
  withStats: boolean = false
): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
  if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
  return BoxedGenerator.of(...getPathWithStats(folder, false));
}

export function listFilesFromArray<T extends boolean = false>(
  list: FileTypeInfos<true>[]
): Bg<Promise<PathAndStats>>;
export function listFilesFromArray<T extends boolean>(
  list: FileTypeInfos<T>[]
) {
  const bgList = list.map(item => old_listFiles(item.folder, item.withStats));
  return BoxedGenerator.from(...bgList);
}

export function listFiles(folder: string): Bg<PathWithStats> {
  console.log('in listFiles' + folder);

  return BoxedGenerator.of(...newGetPathWithStats(folder)).map(pat => {
    console.log('pat', pat);
    return pat;
  });
}
