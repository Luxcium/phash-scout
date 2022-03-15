import { immediateZalgo } from '../../imports';
import { CurrentPath } from '../../types';
import { currentPath } from './currentPath';
import { dirListWithFileType } from './dirListWithFileType';
import { isA_Promise } from './isA_Promise';

export function getCurrentPaths(
  folderPath: string,
  isAsync: boolean
): CurrentPath[];
export function getCurrentPaths(
  folderPath: Promise<string>
): Promise<CurrentPath[]>;
export function getCurrentPaths(
  folderPath: string | Promise<string>,
  isAsync: boolean = true
): CurrentPath[] | Promise<CurrentPath[]> {
  if (isA_Promise(folderPath)) {
    return (async () =>
      (await dirListWithFileType(folderPath)).map(
        currentPath(await folderPath)
      ))();
  }
  if (isAsync) {
    const folderPath_ = immediateZalgo(folderPath);
    return (async () =>
      (await dirListWithFileType(folderPath_)).map(
        currentPath(await folderPath_)
      ))();
  }

  return dirListWithFileType(folderPath).map(currentPath(folderPath));
}
