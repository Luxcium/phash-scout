import { stat } from 'fs/promises';
import path from 'path';
import { immediateZalgo } from './imports';
import { FileTypes } from './tools';
import type { GetStats, PathAndStats, PathWithStats } from './types';
import { dirListWithFileType } from './utils/dirListWithFileType';
import { getChildPaths } from './utils/getChildPaths';
import { getCurrentPath } from './utils/getCurrentPath';

const humanSize = require('human-size');

path;
export function getPathWithStats(
  folderPath: string,
  withStats: false
): Promise<PathWithStats>[];

export function getPathWithStats(
  folderPath: string,
  withStats: true
): Promise<PathAndStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean
): Promise<PathWithStats | PathAndStats>[];
export function getPathWithStats(folderPath: string): Promise<PathWithStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean = false
): Promise<PathWithStats | PathAndStats>[] {
  const dirList = dirListWithFileType(folderPath);
  const result = dirList.map(async i => {
    const { type, pathToFile, fullPath, fileName } = {
      ...getCurrentPath(i, folderPath),
    };
    const extname = path.extname(fullPath);
    const ext = extname.toLowerCase();
    const getStats = async (): Promise<
      GetStats & { ext: string; exclude: boolean; hSize?: string }
    > => {
      try {
        const stats = { ...(await stat(fullPath)) };
        const hSize = humanSize(stats.size, 4);
        return {
          fileName,
          extname,
          ext,
          pathToFile,
          fullPath,
          type,
          ...stats,
          hSize,
          exclude: false,
        };
      } catch (error: any) {
        return immediateZalgo<GetStats>({
          pathToFile: '',
          fullPath: '',
          fileName: '',
          extname: '',
          ext: '',
          hSize: '',
          type: FileTypes.Error,
          ...error,
          exclude: true,
        });
      }
    };
    if (withStats) {
      return {
        ...(await getStats()),
        exclude: false,
        getStats,
        getChild: getChildPaths(fullPath, type, withStats),
      };
    }

    return {
      fileName,
      extname,
      ext,
      pathToFile,
      fullPath,
      type,
      exclude: false,
      getStats,
      getChild: getChildPaths(fullPath, type, withStats),
    };
  });

  return result;
}
