import { DirentWithFileType } from '../../../types';

// const = require('sharp-phash');
export function filterFiles(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isFile);
  }

  return element.isFile;
}
