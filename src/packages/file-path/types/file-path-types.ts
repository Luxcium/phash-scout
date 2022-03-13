import { FileType } from '../tools';

export type WithFileName = {
  fileName: string;
};

export type WithPathToFile = {
  pathToFile: string;
};

export type WithFullPath = {
  fullPath: string;
};

export type WithFileType = {
  type: FileType;
};

export type CurrentPath = WithFileName &
  WithPathToFile &
  WithFullPath &
  WithFileType;

export type CurrentPathError = ErrorTypePath & {
  fileName: '';
  pathToFile: '';
  fullPath: '';
  type: FileType.Error;
};
export type BlockDevicePath = CurrentPath & {
  readonly type: FileType.BlockDevice;
};
export type CharacterDevicePath = CurrentPath & {
  readonly type: FileType.CharacterDevice;
};
export type DirectoryPath = CurrentPath & {
  readonly type: FileType.Directory;
};
export type FIFOPath = CurrentPath & {
  readonly type: FileType.FIFO;
};
export type FilePath = CurrentPath & {
  readonly type: FileType.File;
};
export type SocketPath = CurrentPath & {
  readonly type: FileType.Socket;
};
export type SymbolicLinkPath = CurrentPath & {
  readonly type: FileType.SymbolicLink;
};

export type UnknownTypePath = CurrentPath & {
  readonly type: FileType.Unknown;
};

export type ErrorTypePath = CurrentPath & {
  readonly type: FileType.Error;
};
