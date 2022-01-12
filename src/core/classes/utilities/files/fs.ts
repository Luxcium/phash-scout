var path = require('path');

import * as fs from 'fs';
import fse from 'fs-extra';
import * as fsPromises from 'fs/promises';
import { BoxedList } from '../..';
import { BASE_SRC_PATH } from './devePaths';
void fse;

path.extname('index.html');
// console.log(getStat(BASE_SRC_PATH2));
// console.log(getStat(BASE_SRC_PATH3));

/*
  fileDetailsLength: 0,
  fileDetails: []
  base: '5d0dead32cd35.jpg',
  basename: '5d0dead32cd35.jpg',
  blksize: 4096,
  blocks: 616,
  delimiter: ':',
  dev: 2081,
  ext: '.jpg',
  extname: '.jpg',
  gid: 1000,
  ino: 90471397,
  mode: 33188,
  name: '5d0dead32cd35',
  nlink: 1,
  rdev: 0,
  root: '/',
  sep: '/',
  size: 313228,
  uid: 1000,
  isFile: true,
  isFIFO: false,
  isSocket: false,
  isAbsolute: true,
  isDirectory: false,
  isBlockDevice: false,
  isSymbolicLink: false,
  isCharacterDevice: false,
  mtimeMs: 1561193933000,
  atimeMs: 1641728690291.4055,
  ctimeMs: 1630898566300.2078,
  atime: 2022-01-09T11:44:50.291Z,
  birthtimeMs: 1630898565985.2107,
  ctime: 2021-09-06T03:22:46.300Z,
  mtime: 2019-06-22T08:58:53.000Z,
  birthtime: 2021-09-06T03:22:45.985Z,
  dir: '/run/media/luxcium/2TB-Seagate/images-tubes/32 Gio/images/car-wash-killian',
  dirname: '/run/media/luxcium/2TB-Seagate/images-tubes/32 Gio/images/car-wash-killian',
  normalize: '/run/media/luxcium/2TB-Seagate/images-tubes/32 Gio/images/car-wash-killian/5d0dead32cd35.jpg',
  toNamespacedPath: '/run/media/luxcium/2TB-Seagate/images-tubes/32 Gio/images/car-wash-killian/5d0dead32cd35.jpg',
 */

export function generateDirs(pathSrc: string = '') {
  const list = getListings(pathSrc);
  if (list.isNode()) return;
}

export function getListings(pathSrc: string = '') {
  const files = getFiles(pathSrc);
  const dirs = getDirs(pathSrc).map(i => `${i}/`);

  return {
    pathSrc,
    dirs: BoxedList.of(dirs),
    files: BoxedList.of(files),
    all: BoxedList.of(...dirs, ...files),
    count: {
      dirs: dirs.length,
      files: files.length,
      all: dirs.length + files.length,
      isLeaf: dirs.length === 0,
      isNode: dirs.length !== 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length !== 0 && files.length === 0,
    },

    isLeaf() {
      return dirs.length === 0;
    },
    isNode() {
      return dirs.length !== 0;
    },
    isEmptyLeaf() {
      return dirs.length === 0 && files.length === 0;
    },
    isEmptyNode() {
      return dirs.length !== 0 && files.length === 0;
    },
  };
}

export function getFiles(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  // readdir.filter(i => !i.isDirectory()).map(i => i.name);
  try {
    return readdir.filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}
export function getDirs(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isDirectory()).map(i => i.name);
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}
export function main() {
  console.log(getFiles(BASE_SRC_PATH + '/un-named' + '/zoom-x088727222')); //.map(i => console.log(i));
  console.log(getDirs(BASE_SRC_PATH + '/un-named' + '/zoom-x088727222')); //.map(i => console.log(i));

  const atPath = getListings(BASE_SRC_PATH);
  atPath.dirs.mapItems<any>(i => {
    console.log(`${i}`);
    return i;
  });
  atPath.files.mapItems<any>(i => {
    console.log(`${i}`);
    return i;
  });
  console.log(atPath); //.map(i => console.log(i));

  // + '/un-named' + '/zoom-x088727222'

  // export function dirCount(pathSrc: string = '') {
  //   const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  //   readdir.filter(i => i.isDirectory()).map(i => console.log(i.name));
  //   try {
  //     return readdir.length;
  //   } catch (error) {
  //     return 0;
  //   }
  // }

  //*
  //+ Tests a user's permissions for the file or directory specified by path.
  fsPromises.access; // 1 (path[, mode])
  //+ Asynchronously append data to a file, creating the file if it does not yet exist.
  fsPromises.appendFile; // 2 (path, data[, options])
  //+ Changes the permissions of a file.
  fsPromises.chmod; // 3 (path, mode)
  //+ Changes the ownership of a file.
  fsPromises.chown; // 4 (path, uid, gid)
  //+ Asynchronously copies src to dest.
  fsPromises.copyFile; // 5 (src, dest[, mode])
  //+ Asynchronously copies the entire directory structure from src to dest, including subdirectories and files.
  fsPromises.cp; // 6 (src, dest[, options])
  //+ Changes the ownership on a symbolic link.
  fsPromises.lchown; // 7 (path, uid, gid)
  //+ Changes the access and modification times of a file in the same way as fsPromises.utimes(), with the difference that if the path refers to a symbolic link, then the link is not dereferenced: instead, the timestamps of the symbolic link itself are changed.
  fsPromises.lutimes; // 8 (path, atime, mtime)
  //+ Creates a new link from the existingPath to the newPath.
  fsPromises.link; // 9 (existingPath, newPath)
  //+ Equivalent to fsPromises.stat() unless path refers to a symbolic link, in which case the link itself is stat-ed, not the file that it refers to.
  fsPromises.lstat; // 10 (path[, options])
  //+ Asynchronously creates a directory.
  fsPromises.mkdir; // 11 (path[, options])
  //+ Creates a unique temporary directory.
  fsPromises.mkdtemp; // 12 (prefix[, options])
  //+ Opens a FileHandle.
  fsPromises.open; // 13 (path, flags[, mode])
  //+ Asynchronously open a directory for iterative scanning.
  fsPromises.opendir; // 14 (path[, options])
  //+ Reads the contents of a directory.
  fsPromises.readdir; // 15 (path[, options])
  //+ Asynchronously reads the entire contents of a file.
  fsPromises.readFile; // 16 (path[, options])
  //+ Reads the contents of the symbolic link referred to by path.
  fsPromises.readlink; // 17 (path[, options])
  //+ Determines the actual location of path using the same semantics as thefs.realpath.native() function.
  fsPromises.realpath; // 18 (path[, options])
  //+ Renames oldPath to newPath.
  fsPromises.rename; // 19 (oldPath, newPath)
  //+ Removes the directory identified by path.
  fsPromises.rmdir; // 20 (path[, options])
  //+ Removes files and directories (modeled on the standard POSIX rm utility).
  fsPromises.rm; // 21 (path[, options])
  //+ Returns: <Promise> Fulfills with the <fs.Stats> object for the given path.
  fsPromises.stat; // 22 (path[, options])
  //+ Creates a symbolic link.
  fsPromises.symlink; // 23 (target, path[, type])
  //+ Truncates (shortens or extends the length) of the content at path to len bytes.
  fsPromises.truncate; // 24 (path[, len])
  //+ If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted.
  fsPromises.unlink; // 25 (path)
  //+ Change the file system timestamps of the object referenced by path.
  fsPromises.utimes; // 26 (path, atime, mtime)
  //+ Returns an async iterator that watches for changes on filename, where filename is either a file or a directory.
  fsPromises.watch; // 27 (filename[, options])
  //+ Asynchronously writes data to a file, replacing the file if it already exists.
  fsPromises.writeFile; // 28 (file, data[, options])
  //+ --------------------------------------------------------------------
  //+ Tests a user's permissions for the file or directory specified by path.
  fs.access; // 1 (path[, mode], callback)
  fs.accessSync; // 1 (path[, mode])
  //+ Asynchronously append data to a file, creating the file if it does not yet exist.
  fs.appendFile; // 2 (path, data[, options], callback)
  fs.appendFileSync; // 2 (path, data[, options])
  //+ Asynchronously changes the permissions of a file.
  fs.chmod; // 3 (path, mode, callback)
  fs.chmodSync; // 3 (path, mode)
  //+ Asynchronously changes owner and group of a file.
  fs.chown; // 4 (path, uid, gid, callback)
  fs.chownSync; // 4 (path, uid, gid)
  //+ Closes the file descriptor.
  fs.close; // 5 (fd[, callback])
  fs.closeSync; // 5 (fd)
  //+ Asynchronously copies src to dest.
  fs.copyFile; // 6 (src, dest[, mode], callback)
  fs.copyFileSync; // 6 (src, dest[, mode])
  //+ Asynchronously copies the entire directory structure from src to dest, including subdirectories and files.
  fs.cp; // 7 (src, dest[, options], callback)
  fs.cpSync; // 7 (src, dest[, options])
  //+ createReadStream
  fs.createReadStream; // 8 (path[, options])
  //+ createWriteStream
  fs.createWriteStream; // 9 (path[, options])
  //+ changes the mode of the file referred to by the open file descriptor fd.
  fs.fchmod; // 10 (fd, mode, callback)
  fs.fchmodSync; // 9 (fd, mode)
  //+ changes the ownership of the file referred to by the open file descriptor fd.
  fs.fchown; // 11 (fd, uid, gid, callback)
  fs.fchownSync; // 10 (fd, uid, gid)
  //+ Forces all currently queued I/O operations associated with the file to the operating system's synchronized I/O completion state. Refer to the POSIX fdatasync(2) documentation for details.
  fs.fdatasync; // 12 (fd, callback)
  fs.fdatasyncSync; // 11 (fd)
  //+ Invokes the callback with the <fs.Stats> for the file descriptor.
  fs.fstat; // 13 (fd[, options], callback)
  fs.fstatSync; // 12 (fd[, options])
  //+ Request that all data for the open file descriptor is flushed to the storage device.
  fs.fsync; // 14 (fd, callback)
  fs.fsyncSync; // 13 (fd)
  //+ Truncates the file descriptor.
  fs.ftruncate; // 15 (fd[, len], callback)
  fs.ftruncateSync; // 14 (fd[, len])
  //+ Change the file system timestamps of the object referenced by the supplied file descriptor.
  fs.futimes; // 16 (fd, atime, mtime, callback)
  fs.futimesSync; // 15 (fd, atime, mtime)
  //+ Set the owner of the symbolic link.
  fs.lchown; // 17 (path, uid, gid, callback)
  fs.lchownSync; // 16 (path, uid, gid)
  //+ Changes the access and modification times of a file
  fs.lutimes; // 18 (path, atime, mtime, callback)
  fs.lutimesSync; // 17 (path, atime, mtime)
  //+ Creates a new link from the existingPath to the newPath.
  fs.link; // 19 (existingPath, newPath, callback)
  fs.linkSync; // 18 (existingPath, newPath)
  //+ Retrieves the <fs.Stats> for the symbolic link referred to by the path.
  fs.lstat; // 20 (path[, options], callback)
  fs.lstatSync; // 19 (path[, options])
  //+ Asynchronously creates a directory.
  fs.mkdir; // 21 (path[, options], callback)
  fs.mkdirSync; // 20 (path[, options])
  //+ Creates a unique temporary directory.
  fs.mkdtemp; // 22 (prefix[, options], callback)
  fs.mkdtempSync; // 21 (prefix[, options])
  //+ Asynchronous file open.
  fs.open; // 23 (path[, flags[, mode]], callback)
  fs.openSync; // 23 (path[, flags[, mode]])
  //+ Asynchronously open a directory.
  fs.opendir; // 24 (path[, options], callback)
  fs.opendirSync; // 22 (path[, options])
  //+ Read data from the file specified by fd.
  fs.read; // 25 (fd, buffer, offset, length, position, callback)
  fs.read; // 26 (fd, [options,] callback)
  fs.readSync; // 27 (fd, buffer, offset, length, position)
  //+ Reads the contents of a directory.
  fs.readdir; // 27 (path[, options], callback)
  fs.readdirSync; // 24 (path[, options])
  //+ Asynchronously reads the entire contents of a file.
  fs.readFile; // 28 (path[, options], callback)
  fs.readFileSync; // 25 (path[, options])
  //+Reads the contents of the symbolic link referred to by path.
  fs.readlink; // 29 (path[, options], callback)
  fs.readlinkSync; // 26 (path[, options])
  //+ Read from a file specified by fd and write to an array of ArrayBufferViews using readv().
  fs.readv; // 30 (fd, buffers[, position], callback)
  fs.readvSync; // 29 (fd, buffers[, position])
  //+ Asynchronously computes the canonical pathname by resolving ., .. and symbolic links.
  fs.realpath; // 31 (path[, options], callback)
  fs.realpathSync; // 30 (path[, options])
  fs.realpath.native; // 32 (path[, options], callback)
  fs.realpathSync.native; // 31 (path[, options])
  //+ Asynchronously rename file at oldPath to the pathname provided as newPath.
  fs.rename; // 33 (oldPath, newPath, callback)
  fs.renameSync; // 32 (oldPath, newPath)
  //+ Asynchronous rmdir(2).
  fs.rmdir; // 34 (path[, options], callback)
  fs.rmdirSync; // 33 (path[, options])
  //+ Asynchronously removes files and directories (modeled on the standard POSIX rm utility).
  fs.rm; // 35 (path[, options], callback)
  fs.rmSync; // 34 (path[, options])
  //+ Asynchronous stat(2).
  fs.stat; // 36 (path[, options], callback)
  fs.statSync; // 35 (path[, options])
  //+ Creates the link called path pointing to target.
  fs.symlink; // 37 (target, path[, type], callback)
  fs.symlinkSync; // 36 (target, path[, type])
  //+ Truncates the file.
  fs.truncate; // 38 (path[, len], callback)
  fs.truncateSync; // 37 (path[, len])
  //+ Asynchronously removes a file or symbolic link.
  fs.unlink; // 39 (path, callback)
  fs.unlinkSync; // 38 (path)
  //+ Stop watching for changes on filename.
  fs.unwatchFile; // 40 (filename[, listener])
  //+ Change the file system timestamps of the object referenced by path.
  fs.utimes; // 41 (path, atime, mtime, callback)
  fs.utimesSync; // 39 (path, atime, mtime)
  //+ Watch for changes on filename, where filename is either a file or a directory.
  fs.watch; // 42 (filename[, options][, listener])
  //+ Watch for changes on filename.
  fs.watchFile; // 43 (filename[, options], listener)
  //+ Write string to the file specified by fd.
  fs.write; // 44 (fd, buffer[, offset[, length[, position]]], callback)
  fs.write; // 45 (fd, string[, position[, encoding]], callback)
  fs.writeSync; // 41 (fd, buffer[, offset[, length[, position]]])
  //+ When file is a filename, asynchronously writes data to the file, replacing the file if it already exists.
  fs.writeFile; // 46 (file, data[, options], callback)
  fs.writeFile; // 47 () with file descriptors
  fs.writeFileSync; // 40 (file, data[, options])
  //+ Write an array of ArrayBufferViews to the file specified by fd using writev().
  fs.writev; // 48 (fd, buffers[, position], callback)
  //+ --------------------------------------------------------------------

  // */
  // File modes
  // File descriptors
  // Performance Considerations
  // Caveats
  // Availability
  // Inodes
  // Filename argument
  // Using;

  // export interface FileSystem {
  //   // readonly readFile: (path: string) => TE.TaskEither<Error, string>;
  //   readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>;
  //   readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>;
  //   readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>;
  //   readonly mkdir: (path: string) => TE.TaskEither<Error, void>;
  //   readonly moveFile: (from: string, to: string) => TE.TaskEither<Error, void>;
  // }

  // // const readFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, string>(fs.readFile);
  // const writeFile = TE.taskify<fs.PathLike, string, NodeJS.ErrnoException, void>(fs.writeFile);
  // const copyFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.copyFile);
  // const glob = TE.taskify<string, Error, ReadonlyArray<string>>(G);
  // const mkdirTE = TE.taskify(fs.mkdir);
  // const moveFile = TE.taskify<fs.PathLike, fs.PathLike, NodeJS.ErrnoException, void>(fs.rename);

  // export const fileSystem: FileSystem = {
  //   // readFile: path => readFile(path, 'utf8'),
  //   writeFile,
  //   copyFile,
  //   glob,
  //   mkdir: flow(
  //     mkdirTE,
  //     TE.map(() => undefined)
  //   ),
  //   moveFile,
  // };
  // const path =
  //   '/run/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users/bravo1/spring-time-fun-gay-boys-porn-x081180651/x_604bcf1f466cb.jpg';
  // const readFrom = fs.createReadStream(path);
  // // const writeBack = fs.createWriteStream(path);

  // readFrom;

  // // let pass = new PassThrough();
  // let pass = readFrom;
  // const writable = new Writable();

  // pass.pipe(writable);
  // pass.unpipe(writable);
  // // readableFlowing is now false.

  // pass.on('data', (chunk: any) => {
  //   console.log('\\a', chunk.toString());
  // });
  // // pass.write('ok'); // Will not emit 'data'.
  // pass.resume(); // Must be called to make stream emit 'data'.
  // const jimp = new Jimp();

  // jimp;

  /*
move to a folder
read it content
iterate in each subfolder

//+ Methods

//+ Async
fse.copy //+ 1
fse.emptyDir //+ 2
fse.ensureFile //+ 3
fse.ensureDir //+ 4
fse.ensureLink //+ 5
fse.ensureSymlink //+ 6
fse.mkdirp //+ 7
fse.mkdirs //+ 8
fse.move //+ 9
fse.outputFile //+ 10
fse.outputJson //+ 11
fse.pathExists //+ 12
fse.readJson //+ 13
fse.remove //+ 14
fse.writeJson //+ 15

//+ Sync
fse.copySync //+ 1
fse.emptyDirSync //+ 2
fse.ensureFileSync //+ 3
fse.ensureDirSync //+ 4
fse.ensureLinkSync //+ 5
fse.ensureSymlinkSync //+ 6
fse.mkdirpSync //+ 7
fse.mkdirsSync //+ 8
fse.moveSync //+ 9
fse.outputFileSync //+ 10
fse.outputJsonSync //+ 11
fse.pathExistsSync //+ 12
fse.readJsonSync //+ 13
fse.removeSync //+ 14
fse.writeJsonSync //+ 15


Path
Windows vs. POSIX
path.basename(path[, ext])
path.delimiter
path.dirname(path)
path.extname(path)
path.format(pathObject)
path.isAbsolute(path)
path.join([...paths])
path.normalize(path)
path.parse(path)
path.posix
path.relative(from, to)
path.resolve([...paths])
path.sep
path.toNamespacedPath(path)
path.win32
 */

  /** @deprecated — Since v10.0.0 */
  //!! fsPromises.lchmod; // (path, mode)
  /** @deprecated — Since v1.0.0 - Use stat or access instead. */
  //!! fs.exists; // (path, callback)
  /** @deprecated — Since v0.4.7 */
  //!! fs.lchmod; // (path, mode, callback)
  /** @deprecated — Since v0.4.7 */
  //!! fs.lchmodSync ;// (path, mode)
  return null;
}
