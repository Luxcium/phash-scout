import { immediateZalgo } from '../../../utils';
import { getPathWithStats } from '../getPathWithStats';
import { FileType, FileTypes } from '../tools';
import {
  CurrentPathAndStats,
  CurrentPathError,
  CurrentPathWithStats,
} from '../types';

export function getChildPaths(
  fullPath: string,
  type: FileType,
  withStats: boolean
) {
  return (): Promise<
    CurrentPathWithStats | CurrentPathAndStats | CurrentPathError
  >[] => {
    try {
      if (type === 'Directory') {
        if (withStats) {
          return [...getPathWithStats(fullPath, withStats)];
        }
        return [...getPathWithStats(fullPath, withStats)];
      }
      return [
        immediateZalgo<CurrentPathError>({
          pathToFile: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
        }),
      ];
    } catch (error: any) {
      return [
        immediateZalgo<CurrentPathError>({
          pathToFile: '',
          fullPath: '',
          fileName: '',
          type: FileTypes.Error,
          ...error,
        }),
      ];
    }
  };
}
