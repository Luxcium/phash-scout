import { FileType } from '../tools';
import { WithExclude } from './WithExclude';

export type CurrentPath = WithFileName &
  WithPathToFile &
  WithFileExtname &
  WithFullPath &
  WithExtname &
  WithExt &
  WithExclude &
  WithFileType;

export type WithFileName = {
  fileName: string;
};
export type WithPathToFile = {
  pathToFile: string;
};
export type WithFullPath = {
  fullPath: string;
};
export type WithFileExtname = {
  extname: string;
};

export type WithExtname = {
  extname: string;
};
export type WithExt = {
  ext: string;
};

export type WithExtention = WithExtname & WithExt;

export type WithFileType = {
  type: FileType;
};

export type WithPHash = {
  pHash: string | null;
};

export type WithCount = {
  count: number;
};
/*

  {
  type: FileType;
};
 Error = 'Error',
export type WithTypeFile = {
  type: FileType.File;
};

export type WithTypeBlockDevice = {
  type: FileType.BlockDevice;
};

export type WithTypeCharacterDevice = {
  type: FileType.CharacterDevice;
};

export type WithTypeFIFO = {
  type: FileType.FIFO;
};

export type WithTypeSocket = {
  type: FileType.Socket;
};

export type WithTypeSymbolicLink = {
  type: FileType.SymbolicLink;
};

export type WithTypeUnknown = {
  type: FileType.Unknown;
};



  File = 'File',
  BlockDevice = 'BlockDevice',
  CharacterDevice = 'CharacterDevice',
  FIFO = 'FIFO',
  Socket = 'Socket',
  SymbolicLink = 'SymbolicLink',
    Unknown = 'Unknown',
    */
