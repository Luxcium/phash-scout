import { getPathWithStats } from '../getPathWithStats';
import { immediateZalgo } from '../imports';
import { FileType, FileTypes } from '../tools';
import { CurrentPathError, PathAndStats, PathWithStats } from '../types';

export function getChildPaths(
  fullPath: string,
  type: FileType,
  withStats: boolean
) {
  return (): Promise<PathWithStats | PathAndStats | CurrentPathError>[] => {
    try {
      if (type === 'Directory') {
        if (withStats) return [...getPathWithStats(fullPath, withStats)];

        return [...getPathWithStats(fullPath, withStats)];
      }
      return [
        immediateZalgo<CurrentPathError>({
          pathToFile: '',
          extname: '',
          ext: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
          exclude: true,
        }),
      ];
    } catch (error: any) {
      return [
        immediateZalgo<CurrentPathError>({
          pathToFile: '',
          extname: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
          ...error,
        }),
      ];
    }
  };
}
