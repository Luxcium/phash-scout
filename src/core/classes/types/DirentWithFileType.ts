export type DirentWithFileType = {
  name: string;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isDirectory: boolean;
  isFIFO: boolean;
  isFile: boolean;
  isSocket: boolean;
  isSymbolicLink: boolean;
};
