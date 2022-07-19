import fs from 'fs';
import { immediateZalgo } from '../../utils';
import { bigString } from '../bigString';

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
    console.error(
      '> \u009B90m at getBigStrPHashFromFile\u009B0m',
      `\u009B31m>\u009B0m \u009B37m\u009B01m${error}\u009B0m`.replace(/\n/g, '')
    );
  }
  return '';
}

async function readFileImgFile(imgFilePath: string): Promise<Buffer> {
  try {
    return await fs.promises.readFile(imgFilePath);
  } catch (error) {
    console.error(
      '\n> \u009B90m at readFileImgFile in getBigStrPHashFromFile can not readFile from:\u0007 \u009B0m'
    );
    throw error;
  }
}

async function calculateSharpPhash(thisImage: Buffer): Promise<string> {
  try {
    return await sharpPhash(thisImage);
  } catch (error) {
    console.error(
      '\n> \u009B90m at calculateSharpPhash in getBigStrPHashFromFile can not process image file,\u0007 \u009B0m'
    );
    throw error;
  }
}

function calculateBigString(sharpPhashValue: string): string {
  try {
    return bigString(sharpPhashValue);
  } catch (error) {
    console.error(
      '\n> \u009B90m at calculateBigString in getBigStrPHashFromFile can not calcualate bigString,\u0007 \u009B0m'
    );
    throw error;
  }
}