import fs from 'fs';
import { CurrentPath } from '../../core/types';
import { bigString } from './bigString';
const phash = require('sharp-phash');

export async function phashNow(imgFile: CurrentPath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.fullPath);
  const phash_: string = bigString(await phash(thisImage));
  return { phash_, index: index + 1, ...imgFile };
}
