import { bigString } from '@luxcium/bigintstring';
import { promises } from 'fs';
import sharpPhash from 'sharp-phash';

export async function getBigStrPHashFromFile(
  imgFilePath: string
): Promise<string> {
  try {
    const thisImage = await promises.readFile(imgFilePath);
    const sharpPhashValue = sharpPhash(thisImage);
    const returnValue = bigString(await sharpPhashValue);
    return returnValue;
  } catch (error) {
    console.error("will return '<empty string>' Error:", error);
    return '';
  }
}
