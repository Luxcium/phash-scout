import fs from 'fs';
import sharpPhash from 'sharp-phash';

import { logError } from '../../../constants';
import { bigString } from '../../../utils';

export async function getBigStrPHashFromFile(
  imgFilePath: string
): Promise<string> {
  try {
    const thisImage = readFileImgFile(imgFilePath);
    const sharpPhashValue = calculateSharpPhash(await thisImage);
    const returnValue = calculateBigString(await sharpPhashValue);

    return returnValue;
  } catch (error) {
    logError(
      String([
        `    \u009B91m> \u009B01m\u009B4m${error}\u009B0m '${imgFilePath}' !!!\u009B0m\n\u009B0m`.replace(
          /\n/g,
          ''
        ),
      ]),
      'at getBigStrPHashFromFile'
    );
    return '-1';
  }
}

export async function readFileImgFile(imgFilePath: string): Promise<Buffer> {
  try {
    return await fs.promises.readFile(imgFilePath);
  } catch (error) {
    throw new Error(
      `${String(error).replace(
        /\n/g,
        ''
      )} at readFileImgFile in getBigStrPHashFromFile can not readFile from:`
    );
  }
}

async function calculateSharpPhash(thisImage: Buffer): Promise<string> {
  try {
    return await sharpPhash(thisImage);
  } catch (error) {
    throw new Error(
      `${String(error).replace(
        /\n/g,
        ''
      )} at calculateSharpPhash in getBigStrPHashFromFile can not process image file`
    );
  }
}

function calculateBigString(sharpPhashValue: string): string {
  try {
    return bigString(sharpPhashValue);
  } catch (error) {
    throw new Error(
      `${String(error).replace(
        /\n/g,
        ''
      )} at calculateBigString in getBigStrPHashFromFile can not calcualate bigString`
    );
  }
}
