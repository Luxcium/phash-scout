import { Dirent, readdirSync } from 'fs';
import { readdir } from 'fs/promises';

import { isA_Promise } from '../assertion-tools';

// ++---------------------------------------------------------------++
export function getRawDirList(pathSrc: string): Dirent[];
export function getRawDirList(pathSrc: Promise<string>): Promise<Dirent[]>;
export function getRawDirList(
  pathSrc: string | Promise<string>
): Dirent[] | Promise<Dirent[]> {
  if (isA_Promise(pathSrc)) {
    return (async () => getRawDirListAsync(await pathSrc))();
  }
  return getRawDirListSync(pathSrc);
}
// ++---------------------------------------------------------------++
export function getRawDirListSync(pathSrc: string) {
  const dirListing: Dirent[] = readdirSync(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}

export async function getRawDirListAsync(pathSrc: string) {
  const dirListing: Dirent[] = await readdir(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}
// &--------------------------------------------------------------- &&

export function test_getRawDirListSync() {
  console.log(getRawDirList('/'));
}
