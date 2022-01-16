import { Dirent } from 'fs';
import { DirentWithFileType } from '../../../types';
import { filesTypes } from '../constants/filesTypes';

export function getDirListWithFileType(
  rawDirListing: Dirent[],
  debug = false
): DirentWithFileType[] {
  try {
    const dirListWithFileType = rawDirListing.map(d => {
      const curent = { name: d.name };
      // HACK:
      //@ts-ignore
      filesTypes.map(method => (curent[method] = d[method]()));

      return curent as DirentWithFileType;
    });

    return dirListWithFileType;
  } catch (error: any) {
    if (debug) console.error(error.message);
    return [];
  }
}
