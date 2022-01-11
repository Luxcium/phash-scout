import { readdir } from 'fs/promises';

export async function getFilesDetails(pathSrc: string = '', debug = false) {
  try {
    const readdir_ = readdir(pathSrc, { withFileTypes: true });
    return readdir_; // .filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error: any) {
    if (debug) console.error(error.message);
    return [];
  }
}
