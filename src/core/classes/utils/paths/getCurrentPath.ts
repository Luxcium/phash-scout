import {
  BlockDevicePath,
  CharacterDevicePath,
  CurrentPath,
  DirectoryPath,
  FIFOPath,
  FilePath,
  SocketPath,
  SymbolicLinkPath,
  UnknownTypePath,
} from '../../../types/CurrentPath';
import { DirentWithFileType } from '../../../types/DirentWithFileType';
import { FileType } from '../../../types/Enums/FileTypeEnum';

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
