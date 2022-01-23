import type { Dirent } from 'fs';
import { filesTypes } from '../../../../../constants/filesTypes';
import type { DirentWithFileType } from '../../../../types';

export function getDirListFileTypes(
  rawDirListing: Dirent[],
  debug = false
): DirentWithFileType[] {
  try {
    const dirListWithFileType = rawDirListing.map(d => {
      const curent = { fileName: d.name };
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
