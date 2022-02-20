import { DirentWithFileType } from '../../../types';

export function filterDirs(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isDirectory);
  }
  return element.isDirectory;
}
