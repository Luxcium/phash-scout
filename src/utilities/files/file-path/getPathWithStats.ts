import { stat } from 'fs/promises';
import { immediateZalgo } from '../../utils';
import { FileTypes } from './tools';
import type {
  CurrentPathAndStats,
  CurrentPathWithStats,
  GetStats,
} from './types';
import { dirListWithFileType } from './utils/dirListWithFileType';
import { getChildPaths } from './utils/getChildPaths';
import { getCurrentPath } from './utils/getCurrentPath';
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
  folderPath: string,
  withStats: boolean = false
): Promise<CurrentPathWithStats | CurrentPathAndStats>[] {
  const dirList = dirListWithFileType(folderPath);
  const result = dirList.map(async i => {
    const { type, pathToFile, fullPath, fileName } = {
      ...getCurrentPath(i, folderPath),
    };
    const getStats = async (): Promise<GetStats> => {
      try {
        return {
          fileName,
          pathToFile,
          fullPath,
          type,
          ...(await stat(fullPath)),
        };
      } catch (error: any) {
        return immediateZalgo<GetStats>({
          pathToFile: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
          ...error,
        });
      }
    };
    if (withStats) {
      return {
        ...(await getStats()),
        getStats,
        getChild: getChildPaths(fullPath, type, withStats),
      };
    }
    return {
      fileName,
      pathToFile,
      fullPath,
      type,
      getStats,
      getChild: getChildPaths(fullPath, type, withStats),
    };
  });

  return result;
}
