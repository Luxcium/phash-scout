import type { DirentWithFileType } from '@types';
import type { Dirent } from 'node:fs';
// import { FileType as filesTypes } from './FileTypeEnum';
// spacin' matters dirent

export function getDirListFileTypes(
  rawDirListing: Dirent[],
  debug = false
): DirentWithFileType[] {
  try {
    const dirListWithFileType = rawDirListing.map(d => {
      const curent = { fileName: d.name };

      // HACK:
      // @ts-ignore
      // filesTypeList.map(method => (curent[method] = d[method]()));

      return curent as DirentWithFileType;
    });

    return dirListWithFileType;
  } catch (error: any) {
    if (debug) console.error(error.message);
    console.error(error.message);
    return [];
  }
}
