import { stat } from 'fs/promises';
import path from 'path';
import { immediateZalgo } from './imports';
import { FileTypes } from './tools';
import type {
  CurrentPathAndStats,
  CurrentPathWithStats,
  GetStats,
} from './types';
import { dirListWithFileType } from './utils/dirListWithFileType';
import { getChildPaths } from './utils/getChildPaths';
import { getCurrentPath } from './utils/getCurrentPath';

path;
export function getPathWithStats(
  folderPath: string,
  withStats: false
): Promise<CurrentPathWithStats>[];

export function getPathWithStats(
  folderPath: string,
  withStats: true
): Promise<CurrentPathAndStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean
): Promise<CurrentPathWithStats | CurrentPathAndStats>[];
export function getPathWithStats(
  folderPath: string
): Promise<CurrentPathWithStats>[];
export function getPathWithStats(
  folderPath: string,
  withStats: boolean = false
): Promise<CurrentPathWithStats | CurrentPathAndStats>[] {
  const dirList = dirListWithFileType(folderPath);
  const result = dirList.map(async i => {
    const { type, pathToFile, fullPath, fileName } = {
      ...getCurrentPath(i, folderPath),
    };
    const extname = path.extname(fullPath);
    const ext = extname.toLowerCase();
    const getStats = async (): Promise<
      GetStats & { ext: string; exclude: boolean }
    > => {
      try {
        return {
          fileName,
          extname,
          ext,
          pathToFile,
          fullPath,
          type,
          ...(await stat(fullPath)),
          exclude: false,
        };
      } catch (error: any) {
        return immediateZalgo<GetStats>({
          pathToFile: '',
          fullPath: '',
          fileName: '',
          extname: '',
          ext: '',
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
