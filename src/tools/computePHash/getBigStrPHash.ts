import fs from 'fs';
import { bigString } from '../bigString';

const sharpPhash = require('sharp-phash');

export async function getBigStrPHash(imgFilePath: string): Promise<string> {
  const thisImage = fs.promises.readFile(imgFilePath);
  return bigString(sharpPhash(await thisImage));
}
