import type { FileType } from './Enums/FileTypeEnum';

export type CurrentPath = {
  fileName: string;
  absolutePathToFile: string;
  fullPath: string;
  type: FileType;
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
