import type { FileType } from './Enums/FileTypeEnum';

export type WithIndex = {
  title: number;
};
export type WithTitle = {
  title: string;
};
export type WithRadius = {
  radius: string;
};
export type WithID = {
  id: number;
};

export type WithPhash = {
  pHash: string;
};
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
