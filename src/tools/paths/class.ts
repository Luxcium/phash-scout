// import { getCurrentPath } from './getCurrentPath';
// import { getDirListFileTypes } from './getDirListWithFileType';
// import { parsePath } from './parsePath';
import { Dirent, readdir, readdirSync } from 'fs-extra';
import humanSize from 'human-size';
import { statSync } from 'node:fs';
import path, { FormatInputPathObject, parse } from 'node:path';

import {
  BlockDevicePath,
  CharacterDevicePath,
  CurrentPath,
  CurrentPathError,
  DirectoryPath,
  DirentWithFileType,
  FIFOPath,
  FilePath,
  GetStats,
  ParsedPath,
  PathAndStats,
  PathWithStats,
  SocketPath,
  SymbolicLinkPath,
  UnknownTypePath,
} from '../../types';
import { FileType, FileTypes } from '..';
import { immediateZalgo } from '../restrainingZalgo';
import { dirListWithFileType } from './dirListWithFileType';
import { getDirsSync, getFilesAsync, getListing } from './fsTools';
import { getChildPaths } from './getChildPaths';
import { getCurrentPath } from './getCurrentPath';
import { currentPath } from './getCurrentPaths';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getPathInfos } from './getPathInfos';
import { getPathStatsInfos } from './getPathStatsInfos';
import { getPathWithStats } from './getPathWithStats';
import {
  getRawDirList,
  getRawDirListAsync,
  getRawDirListSync,
} from './getRawDirList';
import { getStats, getStatsSync } from './getStats';
import { listFiles } from './listFiles';
import { parsePath } from './parsePath';
import { pathParser } from './pathParser';

export interface PlatformPath {
  /**
   * Normalize a string path, reducing '..' and '.' parts.
   * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
   *
   * @param p string path to normalize.
   */
  normalize(p: string): string;
  /**
   * Join all arguments together and normalize the resulting path.
   * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
   *
   * @param paths paths to join.
   */
  join(...paths: string[]): string;
  /**
   * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
   *
   * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
   *
   * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
   * until an absolute path is found. If after using all {from} paths still no absolute path is found,
   * the current working directory is used as well. The resulting path is normalized,
   * and trailing slashes are removed unless the path gets resolved to the root directory.
   *
   * @param pathSegments string paths to join.  Non-string arguments are ignored.
   */
  resolve(...pathSegments: string[]): string;
  /**
   * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
   *
   * @param path path to test.
   */
  isAbsolute(p: string): boolean;
  /**
   * Solve the relative path from {from} to {to}.
   * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
   */
  relative(from: string, to: string): string;
  /**
   * Return the directory name of a path. Similar to the Unix dirname command.
   *
   * @param p the path to evaluate.
   */
  dirname(p: string): string;
  /**
   * Return the last portion of a path. Similar to the Unix basename command.
   * Often used to extract the file name from a fully qualified path.
   *
   * @param p the path to evaluate.
   * @param ext optionally, an extension to remove from the result.
   */
  basename(p: string, ext?: string): string;
  /**
   * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
   * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
   *
   * @param p the path to evaluate.
   */
  extname(p: string): string;
  /**
   * The platform-specific file separator. '\\' or '/'.
   */
  readonly sep: string;
  /**
   * The platform-specific file delimiter. ';' or ':'.
   */
  readonly delimiter: string;
  /**
   * Returns an object from a path string - the opposite of format().
   *
   * @param pathString path to evaluate.
   */
  parse(p: string): ParsedPath;
  /**
   * Returns a path string from an object - the opposite of parse().
   *
   * @param pathString path to evaluate.
   */
  format(pP: FormatInputPathObject): string;
  /**
   * On Windows systems only, returns an equivalent namespace-prefixed path for the given path.
   * If path is not a string, path will be returned without modifications.
   * This method is meaningful only on Windows system.
   * On POSIX systems, the method is non-operational and always returns path without modifications.
   */
  toNamespacedPath(path: string): string;
  /**
   * Posix specific pathing.
   * Same as parent object on posix.
   */
  readonly posix: PlatformPath;
  /**
   * Windows specific pathing.
   * Same as parent object on windows
   */
  readonly win32: PlatformPath;
}
// , path.PlatformPath
export class CustomPath implements path.ParsedPath {
  constructor(
    private _path: string,
    private _withStats: boolean = false,
    private _withFileTypes: boolean = true
  ) {}
  // ==== path.PlatformPath ====================================================
  /**
   * Normalize a string path, reducing '..' and '.' parts.
   * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
   *
   * @param p string path to normalize.
   */
  static normalize(p: string): string {
    return path.normalize(p);
  }
  /**
   * Join all arguments together and normalize the resulting path.
   * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
   *
   * @param paths paths to join.
   */
  static join(...paths: string[]): string {
    return path.join(...paths);
  }
  /**
   * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
   *
   * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
   *
   * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
   * until an absolute path is found. If after using all {from} paths still no absolute path is found,
   * the current working directory is used as well. The resulting path is normalized,
   * and trailing slashes are removed unless the path gets resolved to the root directory.
   *
   * @param pathSegments string paths to join.  Non-string arguments are ignored.
   */
  static resolve(...pathSegments: string[]): string {
    return path.resolve(...pathSegments);
  }
  /**
   * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
   *
   * @param path path to test.
   */
  static isAbsolute(p: string): boolean {
    return path.isAbsolute(p);
  }
  /**
   * Solve the relative path from {from} to {to}.
   * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
   */
  static relative(from: string, to: string): string {
    return path.relative(from, to);
  }
  /**
   * Return the directory name of a path. Similar to the Unix dirname command.
   *
   * @param p the path to evaluate.
   */
  static dirname(p: string): string {
    return path.dirname(p);
  }
  /**
   * Return the last portion of a path. Similar to the Unix basename command.
   * Often used to extract the file name from a fully qualified path.
   *
   * @param p the path to evaluate.
   * @param ext optionally, an extension to remove from the result.
   */
  static basename(p: string, ext?: string): string {
    return path.basename(p, ext);
  }
  /**
   * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
   * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
   *
   * @param p the path to evaluate.
   */
  static extname(p: string): string {
    return path.extname(p);
  }
  /**
   * The platform-specific file separator. '\\' or '/'.
   */
  static get sep(): string {
    return path.sep;
  }
  /**
   * The platform-specific file delimiter. ';' or ':'.
   */
  static get delimiter(): string {
    return path.delimiter;
  }
  /**
   * Returns an object from a path string - the opposite of format().
   *
   * @param pathString path to evaluate.
   */
  static parse(pathString: string): ParsedPath {
    return path.parse(pathString);
  }
  /**
   * Returns a path string from an object - the opposite of parse().
   *
   * @param pathObject path to evaluate.
   */
  static format(pathObject: FormatInputPathObject): string {
    return path.format(pathObject);
  }
  /**
   * On Windows systems only, returns an equivalent namespace-prefixed path for the given path.
   * If path is not a string, path will be returned without modifications.
   * This method is meaningful only on Windows system.
   * On POSIX systems, the method is non-operational and always returns path without modifications.
   */
  static toNamespacedPath(p: string): string {
    return path.toNamespacedPath(p);
  }
  /**
   * Posix specific pathing.
   * Same as parent object on posix.
   */
  static get posix(): PlatformPath {
    return path.posix;
  }
  /**
   * Windows specific pathing.
   * Same as parent object on windows
   */
  static get win32(): PlatformPath {
    return path.win32;
  }

  // ==== path.PlatformPath ====================================================
  get value() {
    return this._path;
  }

  get hasStats() {
    return this._withStats;
  }

  get hasFileTypes() {
    return this._withFileTypes;
  }
  // ==== path.ParsedPath ======================================================
  get parsed(): path.ParsedPath {
    return path.parse(this.value);
  }
  pathParser() {
    const parsedPath = this.parsed;
    return {
      pathInfos: {
        ...parsedPath,
        fullPath: this.value,
        extname: parsedPath.ext.toLowerCase(),
        baseName: parsedPath.base,
      },
    };
  }
  /**
   * The root of the path such as '/' or 'c:\'  \
   * @see {@link path.ParsedPath | ParsedPath}
   */
  get root() {
    return this.parsed.root;
  }
  /**
   * The full directory path such as '/home/user/dir' or 'c() {\path\dir'}  \
   * @see {@link path.ParsedPath | ParsedPath}
   */
  get dir() {
    return this.parsed.dir;
  }
  /**
   * The file name including extension (if any) such as 'index.html'  \
   * @see {@link path.ParsedPath | ParsedPath}
   */
  get base() {
    return this.parsed.base;
  }
  /**
   * The file extension (if any) such as '.html'  \
   * @see {@link path.ParsedPath | ParsedPath}
   */
  get ext() {
    return this.parsed.ext;
  }
  /**
   * The file name without extension (if any) such as 'index'  \
   * @see {@link path.ParsedPath | ParsedPath}
   */
  get name() {
    return this.parsed.name;
  }
  get parsedPath() {
    return {
      /**
       * The root of the path such as '/' or 'c:\'
       */
      root: this.root,
      /**
       * The full directory path such as '/home/user/dir' or 'c:\path\dir'
       */
      dir: this.dir,
      /**
       * The file name including extension (if any) such as 'index.html'
       */
      base: this.base,
      /**
       * The file extension (if any) such as '.html'
       */
      ext: this.ext,
      /**
       * The file name without extension (if any) such as 'index'
       */
      name: this.name,

      fullPath: this.value,
      baseName: this.base,
      extname: this.ext.toLowerCase(),
    };
  }
  get fullPath() {
    return this.value;
  }
  get baseName() {
    return this.base;
  }

  get extname() {
    return this.ext.toLowerCase();
  }

  // ==== path.ParsedPath ======================================================
  // basename(p: string = this.value, ext?: string | undefined) {

  //   return path.basename(p, ext);
  // }
  // parse(p: string = this.value) {
  //   return path.parse(p);
  // }
  // format(pP: path.FormatInputPathObject = this.parsedPath) {
  //   return path.format(pP);
  // }

  // normalize(p: string = this.value) {
  //   return path.normalize(p);
  // }
  // join(...paths: string[]) {
  //   return path.join(...paths);
  // }
  // resolve(...pathSegments: string[]): string {
  //   return path.resolve(...pathSegments);
  // }
  // relative(from: string, to: string) {
  //   return path.relative(from, to);
  // }

  // extname(p: string = this.value) {
  //   return path.extname(p);
  // }

  // dirname(p: string = this.value) {
  //   return path.dirname(p);
  // }
  // isAbsolute(p: string = this.value) {
  //   return path.isAbsolute(p);
  // }
  // get normalized() {
  //   return path.normalize(this.value);
  // }

  // toNamespacedPath(p: string = this.value) {
  //   return path.toNamespacedPath(p);
  // }
  // get sep() {
  //   return path.sep;
  // }

  // get delimiter() {
  //   return path.delimiter;
  // }

  // get pBasename() {
  //   return path.basename;
  // }
  // get pFormat() {
  //   return path.format;
  // }
  // get pJoin() {
  //   return path.join;
  // }
  // get pRelative() {
  //   return path.relative;
  // }
  // get pResolve() {
  //   return path.resolve;
  // }
}

export class CustomPathBloated {
  /*

    fileName: string;
    dir: string;
    fullPath: string;
    extname: string;
    baseName: string;
    ext: string;
    exclude: boolean;
    type: FileTypes;

     */

  _pathInfos: {
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root: string;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base: string;
    /**
     * The file extension (if any) such as '.html'
     */
    ext: string;
    /**
     * The file name without extension (if any) such as 'index'
     */
    name: string;
    fullPath: string;
    extname: string;
    baseName: string;
  };
  get pathInfos() {
    return {
      ...this._pathInfos,
      dirname: () => path.dirname(this.value),
      extname: () => path.extname(this.value),
      isAbsolute: () => path.isAbsolute(this.value),
      normalized: () => path.normalize(this.value),
      parsed: () => path.parse(this.value),
      toNamespacedPath: () => path.toNamespacedPath(this.value),
      posix: () => path.posix,
      sep: () => path.sep,
      win32: () => path.win32,
      delimiter: () => path.delimiter,
      pBasename: path.basename,
      pFormat: path.format,
      pJoin: path.join,
      pRelative: path.relative,
      pResolve: path.resolve,
    };
  }

  constructor(
    private _paths: string,
    private _withStats: boolean = false,
    private _withFileTypes: boolean = true
  ) {
    const path = parse(this._paths);
    this._pathInfos = {
      ...path,
      fullPath: this._paths,
      extname: path.ext.toLowerCase(),
      baseName: path.base,
    };
  }

  get value() {
    return this._paths;
  }

  getStats(currentPath: {
    fileName: string;
    dir: string;
    fullPath: string;
    extname: string;
    baseName: string;
    ext: string;
    exclude: boolean;
    type: FileTypes;
  }): GetStats & { ext: string; exclude: boolean; hSize?: string } {
    try {
      const stats = { ...statSync(this.value) };
      const hSize = humanSize(stats.size, 4);
      return {
        ...currentPath,
        ...stats,
        hSize,
        exclude: false,
      };
    } catch (error: any) {
      return {
        dir: '',
        fullPath: '',
        baseName: '',
        fileName: '',
        extname: '',
        ext: '',
        hSize: '',
        type: FileTypes.Error,
        ...error,
        exclude: true,
      };
    }
  }
  getChildPaths(type: FileType, withStats: boolean) {
    return (): Promise<PathWithStats | PathAndStats | CurrentPathError>[] => {
      try {
        if (type === 'Directory') {
          // if (withStats) return [...getPathWithStats(fullPath, withStats)];
          return [...this.getPathWithStats(withStats)];
        }
        return [
          immediateZalgo<CurrentPathError>({
            dir: '',
            extname: '',
            ext: '',
            fullPath: '',
            fileName: '',
            baseName: '',
            type: FileTypes.Error,
            exclude: true,
          }),
        ];
      } catch (error: any) {
        return [
          immediateZalgo<CurrentPathError>({
            dir: '',
            extname: '',
            fullPath: '',
            fileName: '',
            type: FileTypes.Error,
            ...error,
          }),
        ];
      }
    };
  }

  getChild(withStats: boolean = this._withStats) {
    const folderPath = this.value;
    const dirList = dirListWithFileType(folderPath);
    const result = dirList.map(f => {
      const currentPath = {
        ...getCurrentPath(f, folderPath),
      };
      const { type, fullPath } = currentPath;
      const getChild = () => this.getChildPaths(type, withStats)();

      if (withStats) {
        const stats = this.getStats(currentPath);
        return {
          ...currentPath,
          ...stats,
          fullPath: path.normalize(fullPath),
          getChild,
          getStats: () => this.getStats(currentPath),
        };
      }
      return {
        ...currentPath,
        fullPath: path.normalize(fullPath),
        getChild,
        getStats: () => this.getStats(currentPath),
      };
    });

    return result;
  }

  getRawDirListSync() {
    const dirListing: Dirent[] = readdirSync(this.value, {
      withFileTypes: true,
    });
    return dirListing;
  }

  async getRawDirListAsync() {
    this._withFileTypes;
    return readdir(this.value, {
      withFileTypes: true,
    });
    // return dirListing;
  }

  get dirListSync() {
    //     export function dirListWithFileType(
    //   folderPath: string | Promise<string>
    // ): DirentWithFileType[] | Promise<DirentWithFileType[]> {
    // if (
    // typeof folderPath !== 'string' &&
    // typeof folderPath === 'object' &&
    // folderPath instanceof Promise
    // ) {
    //   return (async () => asyncDirListWithFileType(await this.value))();
    // }
    const dirListing: Dirent[] = readdirSync(this.value, {
      withFileTypes: true,
    });
    const rawDirList = dirListing;
    return getDirListFileTypes(rawDirList);
  }
  // return dirListWithFileType(this.value);
  // }
  listFiles() {
    const self = this;
    const result = this.dirListSync.map(function (f) {
      const currentPath = {
        ...self._getCurrentFilePath(f),
      };
      const { fullPath, type } = currentPath;
      const getChild = getChildPaths(fullPath, type, false);

      return {
        ...currentPath,
        getChild,
        getStats: () => self.getStats(currentPath),
      };
    });

    return result;
  }

  _getCurrentFilePath(f: DirentWithFileType) {
    const fullPath = `${this.value}/${f.fileName}`;
    const _fullPath: CurrentPath = {
      type: FileTypes.Unknown,
      ...parsePath(fullPath),
      exclude: false,
    };
    if (f.isDirectory) {
      _fullPath.type = FileTypes.Directory;
      return _fullPath as DirectoryPath;
    }
    if (f.isFile) {
      _fullPath.type = FileTypes.File;
      return _fullPath as FilePath;
    }
    if (f.isSymbolicLink) {
      _fullPath.type = FileTypes.SymbolicLink;
      return _fullPath as SymbolicLinkPath;
    }
    if (f.isBlockDevice) {
      _fullPath.type = FileTypes.BlockDevice;
      return _fullPath as BlockDevicePath;
    }
    if (f.isCharacterDevice) {
      _fullPath.type = FileTypes.CharacterDevice;
      return _fullPath as CharacterDevicePath;
    }

    if (f.isFIFO) {
      _fullPath.type = FileTypes.FIFO;
      return _fullPath as FIFOPath;
    }

    if (f.isSocket) {
      _fullPath.type = FileTypes.Socket;
      return _fullPath as SocketPath;
    }

    return _fullPath as UnknownTypePath;
  }

  /**
   * The root of the path such as '/' or 'c:\'
   */
  get root() {
    return this.parsed.root;
  }
  /**
   * The full directory path such as '/home/user/dir' or 'c() {\path\dir'}
   */
  get dir() {
    return this.parsed.dir;
  }
  /**
   * The file name including extension (if any) such as 'index.html'
   */
  get base() {
    return this.parsed.base;
  }
  /**
   * The file extension (if any) such as '.html'
   */
  get ext() {
    return this.parsed.ext;
  }
  /**
   * The file name without extension (if any) such as 'index'
   */
  get fullName() {
    return this.parsed.name;
  }
  get fullPath() {
    return this.value;
  }

  get extname() {
    return this.parsed.ext.toLowerCase();
  }
  get baseName() {
    return this.parsed.base;
  }
  get dirname() {
    return path.dirname(this.value);
  }
  get isAbsolute() {
    return path.isAbsolute(this.value);
  }
  get normalized() {
    return path.normalize(this.value);
  }
  get parsed() {
    return path.parse(this.value);
  }
  get toNamespacedPath() {
    return path.toNamespacedPath(this.value);
  }
  get posix() {
    return path.posix;
  }
  get sep() {
    return path.sep;
  }
  get win32() {
    return path.win32;
  }
  get delimiter() {
    return path.delimiter;
  }

  get pBasename() {
    return path.basename;
  }
  get pFormat() {
    return path.format;
  }
  get pJoin() {
    return path.join;
  }
  get pRelative() {
    return path.relative;
  }
  get pResolve() {
    return path.resolve;
  }
  static getDirsSync() {
    return getDirsSync;
  }
  static getFilesAsync() {
    return getFilesAsync;
  }
  static getListing() {
    return getListing;
  }
  static currentPath() {
    return currentPath;
  }
  static getPathInfos() {
    return getPathInfos;
  }
  static getPathStatsInfos() {
    return getPathStatsInfos;
  }
  static getPathWithStats() {
    return getPathWithStats;
  }
  static getRawDirList() {
    return getRawDirList;
  }
  static getRawDirListAsync() {
    return getRawDirListAsync;
  }
  static getRawDirListSync() {
    return getRawDirListSync;
  }
  static getStats() {
    return getStats;
  }
  static getStatsSync() {
    return getStatsSync;
  }
  static listFiles() {
    return listFiles;
  }
  static pathParser() {
    return pathParser;
  }

  getDirsSync() {
    return getDirsSync;
  }
  getFilesAsync() {
    return getFilesAsync;
  }
  getListing() {
    return getListing;
  }
  currentPath() {
    return currentPath;
  }

  getPathStatsInfos() {
    return getPathStatsInfos;
  }
  getPathWithStats(withStats = this._withStats) {
    return getPathWithStats(this.value, withStats);
  }
  getRawDirList() {
    return getRawDirList;
  }

  getStatsSync() {
    return getStatsSync;
  }
  pathParser() {
    const path = parse(this.value);
    return {
      pathInfos: {
        ...path,
        fullPath: this.value,
        extname: path.ext.toLowerCase(),
        baseName: path.base,
      },
    };
  }

  // getPathInfos(){
  //   return getPathInfos
  // }
  // getRawDirListAsync(){
  //   return getRawDirListAsync
  // }
  // getRawDirListSync(){
  //   return getRawDirListSync
  // }
  // getStats(){
  //   return getStats
  // }

  // listFiles(){
  //   return listFiles
  // }
}

const customPath = new CustomPathBloated('/');
customPath;
console.log('customPath.childs', customPath.getChild(true));

function __test__() {
  const array = [];
  for (let i = 0; i < Infinity; i++) {
    array.push(new CustomPath('/'));
    console.log(i);
  }
}

__test__();
