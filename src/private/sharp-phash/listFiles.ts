import { BoxedGenerator } from '@luxcium/boxed-list';
import { getPathWithStats } from '../../packages/file-path';
import { PathAndStats, PathWithStats } from '../../packages/file-path/types';
import { Bg } from '../../packages/file-path/types/Bg';

export function listFiles(
  folder: string,
  withStats?: false
): Bg<Promise<PathWithStats>>;
export function listFiles(
  folder: string,
  withStats: true
): Bg<Promise<PathAndStats>>;
export function listFiles(
  folder: string,
  withStats?: boolean
): Bg<Promise<PathWithStats>>;
export function listFiles(
  folder: string,
  withStats: boolean = false
): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
  if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
  return BoxedGenerator.of(...getPathWithStats(folder, false));
}

export type MyType<T extends boolean = boolean> = {
  folder: string;
  withStats?: T;
};
export function listFilesFromArray<T extends boolean = false>(
  list: MyType<true>[]
): Bg<Promise<PathAndStats>>;
export function listFilesFromArray<T extends boolean>(list: MyType<T>[]) {
  const bgList = list.map(item => listFiles(item.folder, item.withStats));
  return BoxedGenerator.from(...bgList);
}

export function listFiles_(
  folder: string,
  withStats: boolean = false
): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
  if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
  return BoxedGenerator.of(...getPathWithStats(folder, false));
}
