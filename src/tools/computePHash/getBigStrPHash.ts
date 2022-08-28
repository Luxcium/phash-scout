import fs from 'fs';

import { logError, logFatal } from '../../constants';
import { bigString } from '../../utils';
import { immediateZalgo } from '..';

const sharpPhash = require('sharp-phash');

export async function getBigStrPHashFromFile(
  imgFilePath: string
): Promise<string> {
  try {
    const thisImage = readFileImgFile(imgFilePath);
    const sharpPhashValue = calculateSharpPhash(await thisImage);
    const returnValue = calculateBigString(await sharpPhashValue);

    return await immediateZalgo(returnValue);
  } catch (error) {
    logError(
      String([
        `    \u009B91m> \u009B01m\u009B4m${error}\u009B0m`.replace(/\n/g, ''),
        `\n\n     > '${imgFilePath}' !!!\u009B0m\n\u009B0m`,
      ]),
      '> at getBigStrPHashFromFile'
    );
    return '0';
  }
}

export async function readFileImgFile(imgFilePath: string): Promise<Buffer> {
  try {
    return await fs.promises.readFile(imgFilePath);
  } catch (error) {
    logFatal(
      String(error),
      '> at readFileImgFile in getBigStrPHashFromFile can not readFile from:'
    );
    throw error;
  }
}

async function calculateSharpPhash(thisImage: Buffer): Promise<string> {
  try {
    return await sharpPhash(thisImage);
  } catch (error) {
    logFatal(
      String(error),
      '> at calculateSharpPhash in getBigStrPHashFromFile can not process image file'
    );
    throw error;
  }
}

function calculateBigString(sharpPhashValue: string): string {
  try {
    return bigString(sharpPhashValue);
  } catch (error) {
    logFatal(
      String(error),
      '> at calculateBigString in getBigStrPHashFromFile can not calcualate bigString'
    );
    throw error;
  }
}
