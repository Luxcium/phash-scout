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

/*
export {filterBlockDevices} from './filterBlockDevices';
export {filterCharacterDevices} from './filterCharacterDevices';
export {filterDirectorys} from './filterDirectorys';
export {filterDirs} from './filterDirs';
export {filterFIFOs} from './filterFIFOs';
export {filterFiles} from './filterFiles';
export {filterSockets} from './filterSockets';
export {filterSymbolicLinks} from './filterSymbolicLinks';

 */
