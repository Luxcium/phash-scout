import { ScanDirs } from '../ScanDirs';

export function listFilesByType(pathStr: string, validExt: string[]) {
  return ScanDirs.from(pathStr)
    .addValidExt([...validExt])
    .map((filePath: string) => {
      return filePath;
    });
}
