import { getPathWithStats } from '.';
import { BoxedGenerator } from '../..';
import { PathAndStats, PathWithStats } from './types';
import { Bg } from './types/Bg';

export function listFiles(
  folder: string,
  withStats: true
): Bg<Promise<PathAndStats>>;
export function listFiles(
  folder: string,
  withStats: false
): Bg<Promise<PathWithStats>>;
export function listFiles(
  folder: string,
  withStats: boolean = false
): Bg<Promise<PathAndStats> | Promise<PathWithStats>> {
  if (withStats) return BoxedGenerator.of(...getPathWithStats(folder, true));
  return BoxedGenerator.of(...getPathWithStats(folder, false));
}
