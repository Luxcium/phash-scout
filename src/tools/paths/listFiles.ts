import { BoxedGenerator } from '@luxcium/boxed-list';
import type { Bg, PathWithStats } from '@types';

import { newGetPathWithStats } from './getPathWithStats';

// export function old_listFiles(
//   folder: string,
//   withStats?: false
// ): Bg<Promise<PathWithStats>>;
// export function old_listFiles(
//   folder: string,
//   withStats: true
// ): Bg<Promise<PathAndStats>>;
// export function old_listFiles(
//   folder: string,
//   withStats?: boolean
// ): Bg<Promise<PathWithStats>>;
// export function old_listFiles(
//   folder: string,
//   withStats: boolean = false
// ): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
//   if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
//   return BoxedGenerator.of(...getPathWithStats(folder, false));
// }

// export function listFilesFromArray<T extends boolean = false>(
//   list: FileTypeInfos<true>[]
// ): Bg<Promise<PathAndStats>>;
// export function listFilesFromArray<T extends boolean>(
//   list: FileTypeInfos<T>[]
// ) {
//   const bgList = list.map(item => old_listFiles(item.folder, item.withStats));
//   return BoxedGenerator.from(...bgList);
// }

export function listFiles(folder: string): Bg<PathWithStats> {
  return BoxedGenerator.of(...newGetPathWithStats(folder)).map(path_ => {
    console.log('(listFiles) path:', path_);
    return path_;
  });
}
