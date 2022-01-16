import { Dirent } from 'fs';
import { readdir } from 'fs/promises';

export async function getRawDirList(pathSrc: string) {
  const dirListing: Dirent[] = await readdir(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}
