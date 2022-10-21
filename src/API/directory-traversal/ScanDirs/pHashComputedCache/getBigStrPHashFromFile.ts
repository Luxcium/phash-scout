import { promises } from 'fs';
import sharpPhash from 'sharp-phash';

import { bigString } from '../../../../utils';

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
