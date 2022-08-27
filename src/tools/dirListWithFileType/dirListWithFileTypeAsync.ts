import { DirentWithFileType } from '../../types';
import { getRawDirListAsync } from '../paths';
import { getDirListFileTypes } from '../paths/getDirListWithFileType';

export async function dirListWithFileTypeAsync(
  folderPath: string
): Promise<DirentWithFileType[]> {
  const rawDirList = await getRawDirListAsync(folderPath);
  return getDirListFileTypes(rawDirList);
}
