import fs from 'fs';
import { bigString } from './bigString';
import { FilePath } from "./FilePath";
const phash = require('sharp-phash');

export async function phashNow(imgFile: FilePath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.path);
  const phash_: string = bigString(await phash(thisImage));
  return { phash_, index: index + 1, ...imgFile };
}
