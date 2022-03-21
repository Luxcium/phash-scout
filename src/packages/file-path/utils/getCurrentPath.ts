import path from 'path';
import { FileTypes } from '../tools';
import {
  BlockDevicePath,
  CharacterDevicePath,
  CurrentPath,
  DirectoryPath,
  DirentWithFileType,
  FIFOPath,
  FilePath,
  SocketPath,
  SymbolicLinkPath,
  UnknownTypePath,
} from '../types';

export function getCurrentPath(f: DirentWithFileType, folderPath: string) {
  const extname = path.extname(`${f.fileName}`);
  const ext = extname.toLowerCase();
  const fullPath: CurrentPath = {
    pathToFile: folderPath,
    extname,
    ext,
    fullPath: `${folderPath}/${f.fileName}`,
    fileName: f.fileName,
    type: FileTypes.Unknown,
    exclude: false,
  };
  if (f.isDirectory) {
    fullPath.type = FileTypes.Directory;
    return fullPath as DirectoryPath;
  }
  if (f.isFile) {
    fullPath.type = FileTypes.File;
    return fullPath as FilePath;
  }
  if (f.isSymbolicLink) {
    fullPath.type = FileTypes.SymbolicLink;
    return fullPath as SymbolicLinkPath;
  }
  if (f.isBlockDevice) {
    fullPath.type = FileTypes.BlockDevice;
    return fullPath as BlockDevicePath;
  }
  if (f.isCharacterDevice) {
    fullPath.type = FileTypes.CharacterDevice;
    return fullPath as CharacterDevicePath;
  }

  if (f.isFIFO) {
    fullPath.type = FileTypes.FIFO;
    return fullPath as FIFOPath;
  }

  if (f.isSocket) {
    fullPath.type = FileTypes.Socket;
    return fullPath as SocketPath;
  }

  return fullPath as UnknownTypePath;
}
