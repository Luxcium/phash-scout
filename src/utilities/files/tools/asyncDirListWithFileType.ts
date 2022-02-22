import { getRawDirList } from '.';
import type { DirentWithFileType } from '../../../core/types';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getRawDirListSync } from './getRawDirList';

export async function asyncDirListWithFileType(
  pathSrc: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirList(pathSrc);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileTypeSync(pathSrc: string): DirentWithFileType[] {
  const rawDirList = getRawDirListSync(pathSrc);
  return getDirListFileTypes(rawDirList);
}

export function dirListWithFileType(pathSrc: string): DirentWithFileType[];
export function dirListWithFileType(
  pathSrc: Promise<string>
): Promise<DirentWithFileType[]>;
export function dirListWithFileType(
  pathSrc: string | Promise<string>
): DirentWithFileType[] | Promise<DirentWithFileType[]> {
  if (
    typeof pathSrc !== 'string' &&
    typeof pathSrc === 'object' &&
    pathSrc instanceof Promise
  ) {
    return (async () => asyncDirListWithFileType(await pathSrc))();
  }
  return dirListWithFileTypeSync(pathSrc);
}
