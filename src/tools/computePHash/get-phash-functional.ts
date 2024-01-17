import { bigString } from '@luxcium/bigintstring';
import fs from 'fs';
import sharpPhash from 'sharp-phash';

type ErrorOr<T> = { isError: false; value: T } | { isError: true; error: any };

const logError =
  (context: string) =>
  (error: any): void => {
    console.error(`Error: ${error.message} - ${context}`);
  };

const readFileImgFile = async (
  imgFilePath: string
): Promise<ErrorOr<Buffer>> => {
  try {
    const buffer = await fs.promises.readFile(imgFilePath);
    return { isError: false, value: buffer };
  } catch (error) {
    return { isError: true, error };
  }
};

const calculateSharpPhash = async (
  thisImage: Buffer
): Promise<ErrorOr<string>> => {
  try {
    const phash = await sharpPhash(thisImage);
    return { isError: false, value: phash };
  } catch (error) {
    return { isError: true, error };
  }
};

const calculateBigString = (sharpPhashValue: string): ErrorOr<string> => {
  try {
    const bigStr = bigString(sharpPhashValue);
    return { isError: false, value: bigStr };
  } catch (error) {
    return { isError: true, error };
  }
};

export const getBigStrPHashFromFile = async (
  imgFilePath: string
): Promise<ErrorOr<string>> => {
  const fileResult = await readFileImgFile(imgFilePath);
  if (fileResult.isError) {
    logError('readFileImgFile')(fileResult.error);
    return fileResult;
  }

  const phashResult = await calculateSharpPhash(fileResult.value);
  if (phashResult.isError) {
    logError('calculateSharpPhash')(phashResult.error);
    return phashResult;
  }

  const bigStringResult = calculateBigString(phashResult.value);
  if (bigStringResult.isError) {
    logError('calculateBigString')(bigStringResult.error);
    return bigStringResult;
  }

  return bigStringResult;
};
