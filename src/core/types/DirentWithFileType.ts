export type DirentWithFileType = {
  fileName: string;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isDirectory: boolean;
  isFIFO: boolean;
  isFile: boolean;
  isSocket: boolean;
  isSymbolicLink: boolean;
};

export enum FileType {
  Directory = 'Directory',
  File = 'File',
  BlockDevice = 'BlockDevice',
  CharacterDevice = 'CharacterDevice',
  FIFO = 'FIFO',
  Socket = 'Socket',
  SymbolicLink = 'SymbolicLink',
  Unknown = 'Unknown',
}

export function getCurrentPath(f: DirentWithFileType, folderPath: string) {
  const fullPath: CurrentPath = {
    absolutePathTo: folderPath,
    fullPathTo: `${folderPath}/${f.fileName}`,
    fileName: f.fileName,
    type: FileType.Unknown,
  };

  if (f.isDirectory) {
    fullPath.type = FileType.Directory;
    return fullPath as DirectoryPath;
  }
  if (f.isFile) {
    fullPath.type = FileType.File;
    return fullPath as FilePath;
  }
  if (f.isSymbolicLink) {
    fullPath.type = FileType.SymbolicLink;
    return fullPath as SymbolicLinkPath;
  }
  if (f.isBlockDevice) {
    fullPath.type = FileType.BlockDevice;
    return fullPath as BlockDevicePath;
  }
  if (f.isCharacterDevice) {
    fullPath.type = FileType.CharacterDevice;
    return fullPath as CharacterDevicePath;
  }

  if (f.isFIFO) {
    fullPath.type = FileType.FIFO;
    return fullPath as FIFOPath;
  }

  if (f.isSocket) {
    fullPath.type = FileType.Socket;
    return fullPath as SocketPath;
  }

  return fullPath as UnknownTypePath;
}

export type CurrentPath = {
  fileName: string;
  absolutePathTo: string;
  fullPathTo: string;
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
/*

blockDevicePath
characterDevicePath
directoryPath
fIFOPath
filePath
socketPath
symbolicLinkPath



*/
