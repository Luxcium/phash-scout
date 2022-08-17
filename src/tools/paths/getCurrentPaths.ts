import { CurrentPath, DirentWithFileType } from '$types';

import { isA_Promise } from '..';
import { getCurrentPath } from './getCurrentPath';
import { dirListWithFileType } from './dirListWithFileType';

export const currentPath = (folderPath: string) => (f: DirentWithFileType) =>
  getCurrentPath(f, folderPath);

export function getCurrentPaths(folderPath: string): CurrentPath[];
export function getCurrentPaths(
  folderPath: Promise<string>
): Promise<CurrentPath[]>;
export function getCurrentPaths(
  folderPath: string | Promise<string>
): CurrentPath[] | Promise<CurrentPath[]> {
  if (isA_Promise(folderPath)) {
    return (async () =>
      (await dirListWithFileType(folderPath)).map(
        currentPath(await folderPath)
      ))();
  }

  return dirListWithFileType(folderPath).map(currentPath(folderPath));
}
