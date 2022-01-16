import { getRawDirList } from '.';
import { DirentWithFileType } from '../../../types';
import { getDirListWithFileType } from './getDirListWithFileType';

export async function asyncDirListWithFileType(
  pathSrc: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirList(pathSrc);
  return getDirListWithFileType(rawDirList);
}
