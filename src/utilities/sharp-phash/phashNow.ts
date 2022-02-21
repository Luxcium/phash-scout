import fs from 'fs';
import { CurrentPath } from '../../core/types';
import { bigString } from './bigString';
const phash = require('sharp-phash');

export async function phashNow(imgFile: CurrentPath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.fullPath);
  try {
    const pHash = phash(thisImage) as Promise<string>;
    const phash_: string = bigString(await pHash);
    return { phash_, index: index + 1, ...imgFile };
  } catch (r) {
    console.error(r, 'Error with file at:', imgFile);
    return { phash_: null, index: index + 1, ...imgFile };
  }
  // const catched = pHash.catch(r =>
  // );
}
