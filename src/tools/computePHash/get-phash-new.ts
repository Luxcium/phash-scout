import { bigString } from '@luxcium/bigintstring';
import fs from 'fs';
// import sharpPhash from 'sharp-phash';
const sharpPhash = require('sharp-phash');

/**
 * Represents the error logging service.
 */
class ErrorLoggingService {
  /**
   * Logs an error message along with its context.
   * @param message - The error message.
   * @param context - The context in which the error occurred.
   */
  public logError(message: string, context: string): void {
    console.error(message, context);
  }
}

/**
 * Represents the image processing service.
 */
export class ImageProcessingService {
  private readonly errorLoggingService: ErrorLoggingService;

  constructor(errorLoggingService: ErrorLoggingService) {
    this.errorLoggingService = errorLoggingService;
  }

  /**
   * Reads the file at the given path and returns its data as a Buffer.
   * @param imgFilePath - The path of the image file.
   * @throws Will throw an error if the file cannot be read.
   */
  private async readFileImgFile(imgFilePath: string): Promise<Buffer> {
    return fs.promises.readFile(imgFilePath);
  }

  /**
   * Calculates the sharpPhash of the given image.
   * @param thisImage - The image data as a Buffer.
   * @throws Will throw an error if the sharpPhash cannot be calculated.
   */
  private async calculateSharpPhash(thisImage: Buffer): Promise<string> {
    return sharpPhash(thisImage);
  }

  /**
   * Calculates the bigString of the given sharpPhash.
   * @param sharpPhashValue - The sharpPhash value.
   * @throws Will throw an error if the bigString cannot be calculated.
   */
  private calculateBigString(sharpPhashValue: string): string {
    return bigString(sharpPhashValue);
  }

  /**
   * Reads the file at the given path, calculates the sharpPhash of the image, and then
   * calculates the bigString of the sharpPhash.
   * @param imgFilePath - The path of the image file.
   * @returns The bigString of the sharpPhash of the image.
   */
  public async getBigStrPHashFromFile(imgFilePath: string): Promise<string> {
    try {
      const thisImage = await this.readFileImgFile(imgFilePath);
      const sharpPhashValue = await this.calculateSharpPhash(thisImage);
      const bigStrPHash = this.calculateBigString(sharpPhashValue);
      return bigStrPHash;
    } catch (error: any) {
      this.errorLoggingService.logError(
        `Error: ${error.message} - ${imgFilePath}`,
        'getBigStrPHashFromFile'
      );
      throw error;
    }
  }
}
