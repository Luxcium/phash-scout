import { getRawDirList } from '.';
import type { CurrentPath, DirentWithFileType } from '../../../core/types';
import { getCurrentPath } from '../../../core/utils';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getRawDirListSync } from './getRawDirList';

export async function asyncDirListWithFileType(
  folderPath: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirList(folderPath);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileTypeSync(
  folderPath: string
): DirentWithFileType[] {
  const rawDirList = getRawDirListSync(folderPath);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileType(folderPath: string): DirentWithFileType[];
export function dirListWithFileType(
  folderPath: Promise<string>
): Promise<DirentWithFileType[]>;
export function dirListWithFileType(
  folderPath: string | Promise<string>
): DirentWithFileType[] | Promise<DirentWithFileType[]> {
  if (
    typeof folderPath !== 'string' &&
    typeof folderPath === 'object' &&
    folderPath instanceof Promise
  ) {
    return (async () => asyncDirListWithFileType(await folderPath))();
  }
  return dirListWithFileTypeSync(folderPath);
}

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

export function isA_Promise<T>(element: T | Promise<T>): element is Promise<T> {
  if (typeof element === 'object' && element instanceof Promise) {
    return true;
  }
  return false;
}

/*
    pathToFile: folderPath,
    fullPath: `${folderPath}/${f.fileName}`,
    fileName: f.fileName,
    type: FileType.Unknown,
 */
