import { stat } from 'fs/promises';
import path from 'path';
import { getDirListing } from './getDirListing';

export async function getStat(pathStr: string) {
  const dirname = path.dirname(pathStr);
  const extname = path.extname(pathStr);
  const isAbsolute = path.isAbsolute(pathStr);
  const normalize = path.normalize(pathStr);
  const parse = path.parse(pathStr);
  const toNamespacedPath = path.toNamespacedPath(pathStr);
  console.error('will getFilesDetails');
  const fileDetails = await getDirListing(pathStr);
  console.error('after getFilesDetails');
  const basename = path.basename(pathStr);
  const delimiter = path.delimiter;
  // const format =  path.format(pathObject)
  // const join =  path.join([...paths])
  // const posix = path.posix;
  // const relative =  path.relative(from, to)
  // const resolve =  path.resolve([...paths])
  const sep = path.sep;
  // const win32 = path.win32;

  console.error('will get stat');
  const stats = await stat(pathStr);
  console.error('after get stat');
  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();
  const isBlockDevice = stats.isBlockDevice();
  const isCharacterDevice = stats.isCharacterDevice();
  const isFIFO = stats.isFIFO();
  const isSocket = stats.isSocket();
  const isSymbolicLink = stats.isSymbolicLink();

  const {
    fileDetailsLength,
    // fileDetails,
    base,
    // basename,
    blksize,
    blocks,
    // delimiter,
    dev,
    ext,
    // extname,
    gid,
    ino,
    mode,
    name,
    nlink,
    rdev,
    root,
    // sep,
    size,
    uid,
    // isFile,
    // isFIFO,
    // isSocket,
    // isAbsolute,
    // isDirectory,
    // isBlockDevice,
    // isSymbolicLink,
    // isCharacterDevice,
    mtimeMs,
    atimeMs,
    ctimeMs,
    atime,
    birthtimeMs,
    ctime,
    mtime,
    birthtime,
    dir,
    // dirname,
    // normalize,
    // toNamespacedPath,
  } = {
    ...stats,
    isDirectory,
    isFile,
    isBlockDevice,
    isCharacterDevice,
    isFIFO,
    isSocket,
    isSymbolicLink,
    delimiter,
    // posix,
    sep,
    // win32,
    dirname,
    extname,
    isAbsolute,
    normalize,
    ...parse,
    toNamespacedPath,
    basename,
    fileDetailsLength: fileDetails.length,
    fileDetails,
  } as any;
  return {
    isFile,
    isFIFO,
    isSocket,
    isAbsolute,
    isDirectory,
    isBlockDevice,
    isSymbolicLink,
    isCharacterDevice,
    atimeMs,
    birthtimeMs,
    ctimeMs,
    mtimeMs,
    atime,
    birthtime,
    ctime,
    mtime,
    dir,
    dirname,
    normalize,
    toNamespacedPath,
    base,
    basename,
    blksize,
    blocks,
    delimiter,
    dev,
    ext,
    extname,
    gid,
    ino,
    mode,
    name,
    nlink,
    rdev,
    root,
    sep,
    size,
    uid,
    fileDetailsLength,
    fileDetails,
  };
}
