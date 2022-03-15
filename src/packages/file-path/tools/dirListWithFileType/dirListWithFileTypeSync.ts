import { DirentWithFileType } from '../../types';
import { getDirListFileTypes } from '../getDirListWithFileType';
import { getRawDirListSync } from '../getRawDirList';

export function dirListWithFileTypeSync(
  folderPath: string
): DirentWithFileType[] {
  const rawDirList = getRawDirListSync(folderPath);
  return getDirListFileTypes(rawDirList);
}
