import type { Dirent } from 'fs';
import { readdir } from 'fs/promises';
import type { DirentWithFileType } from '../../types';
import { filesTypes } from './filesTypes';

export async function getDirListing(pathSrc: string = '', debug = false) {
  try {
    const dirListing: Dirent[] = await readdir(pathSrc, {
      withFileTypes: true,
    });
    const withFileTypeList = dirListing.map(d => {
      const curent = { name: d.name };
      //@ts-ignore
      filesTypes.map(method => (curent[method] = d[method]()));

      return curent as DirentWithFileType;
    });

    return withFileTypeList;
  } catch (error: any) {
    if (debug) console.error(error.message);
    return [];
  }
}

async function main() {
  console.log('main in :', __filename);

  return;
}

void main;
// main();
