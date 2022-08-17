import { DirentWithFileType } from '../../types';
import { getRawDirList } from '../paths';
import { getDirListFileTypes } from '../paths/getDirListWithFileType';

export async function dirListWithFileTypeAsync(
  folderPath: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirList(folderPath);
  return getDirListFileTypes(rawDirList);
}
