import { DirentWithFileType } from '../../types';
import { getCurrentPath } from '../../utils';

export function currentPath(folderPath: string) {
  return (f: DirentWithFileType) => getCurrentPath(f, folderPath);
}
