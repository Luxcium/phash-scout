import { isA_Promise } from '../../tools';
import type {
  CurrentPath,
  CurrentPathAndStats,
  CurrentPathWithStats,
  DirentWithFileType,
} from '../../types';

// const = require('sharp-phash');

export function filterFiles(
  element: Promise<CurrentPathAndStats | CurrentPathWithStats>
): Promise<boolean>;
export function filterFiles(element: CurrentPath): boolean;
export function filterFiles(
  element: DirentWithFileType[]
): DirentWithFileType[];
export function filterFiles(element: DirentWithFileType): boolean;

export function filterFiles(
  element:
    | DirentWithFileType
    | DirentWithFileType[]
    | CurrentPath
    | Promise<CurrentPathAndStats | CurrentPathWithStats>
): boolean | DirentWithFileType[] | Promise<boolean> {
  if (Array.isArray(element)) {
    return element.filter(item => item.isFile);
  }

  if ('isFile' in element) {
    return element.isFile;
  }

  if (isA_Promise(element)) {
    return (async () => {
      const element_ = await element;
      return element_.type === 'File';
    })();
  }
  return element.type === 'File';
}

/*
 Promise<CurrentPathAndStats>[]

    return (async () => {
      return (await dirListWithFileType(folderPath)).map(
        currentPath(await folderPath)
      );
    })();


 */
