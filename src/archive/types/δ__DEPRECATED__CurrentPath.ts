import type { FileType } from '../../types/Enums/FileTypeEnum';

/** @deprecated */
export type WithIndex = {
  index: number;
};
/** @deprecated */
export type WithTitle = {
  title: string;
};
/** @deprecated */
export type WithRadius = {
  radius: string;
};
/** @deprecated */
export type WithID = {
  id: number;
};

/** @deprecated */
export type WithPhash = {
  pHash: string;
};
/** @deprecated */
export type WithFileName = {
  fileName: string;
};

/** @deprecated */
export type WithPathToFile = {
  dir: string;
};

/** @deprecated */
export type WithFullPath = {
  fullPath: string;
};

/** @deprecated */
export type WithFileType = {
  type: FileType;
};

/** @deprecated */
export type CurrentPathOld = WithFileName &
  WithPathToFile &
  WithFullPath &
  WithFileType;
/** @deprecated */
export type BlockDevicePath = CurrentPathOld & {
  readonly type: FileType.BlockDevice;
};
/** @deprecated */
export type CharacterDevicePath = CurrentPathOld & {
  readonly type: FileType.CharacterDevice;
};
/** @deprecated */
export type DirectoryPath = CurrentPathOld & {
  readonly type: FileType.Directory;
};
/** @deprecated */
export type FIFOPath = CurrentPathOld & {
  readonly type: FileType.FIFO;
};
/** @deprecated */
export type FilePath = CurrentPathOld & {
  readonly type: FileType.File;
};
/** @deprecated */
export type SocketPath = CurrentPathOld & {
  readonly type: FileType.Socket;
};
/** @deprecated */
export type SymbolicLinkPath = CurrentPathOld & {
  readonly type: FileType.SymbolicLink;
};

/** @deprecated */
export type UnknownTypePath = CurrentPathOld & {
  readonly type: FileType.Unknown;
};
