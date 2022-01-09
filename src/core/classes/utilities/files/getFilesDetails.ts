import { readdirSync } from 'fs-extra';

export function getFilesDetails(pathSrc: string = '', debug = false) {
  try {
    const readdir = readdirSync(pathSrc, { withFileTypes: true });
    return readdir; // .filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error: any) {
    if (debug) console.error(error.message);
    return [];
  }
}
