// const = require('sharp-phash');

import { CurrentPath, DirentWithFileType } from '../../types';

export function filterFiles(element: CurrentPath): boolean;
export function filterFiles(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterFiles(element: DirentWithFileType): boolean;

export function filterFiles(
  element: DirentWithFileType | DirentWithFileType[] | CurrentPath
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isFile);
  }
  if ('isFile' in element) {
    return element.isFile;
  }
  return element.type === 'File';
}
