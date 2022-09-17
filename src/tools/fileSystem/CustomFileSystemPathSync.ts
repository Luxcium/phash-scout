import type {
  BigIntStats,
  CopySyncOptions,
  EncodingOption,
  MakeDirectoryOptions,
  Mode,
  PathLike,
  PathOrFileDescriptor,
  ReadPosition,
  RmDirOptions,
  RmOptions,
  StatOptions,
  Stats,
  StatSyncOptions,
  symlink,
  TimeLike,
  WriteFileOptions,
} from 'node:fs';
import * as fs from 'node:fs';
import { realpathSync } from 'node:fs';
import path, { join } from 'node:path';

import { CustomPath } from './abstract_CustomPath';
import { ICustomFileSystemPath } from './ICustomFileSystemPath';

export class CustomFileSystemPathSync
  extends CustomPath
  implements path.ParsedPath, ICustomFileSystemPath, ICustomFileSystemPath_
{
  static of(newPath: string) {
    return new CustomFileSystemPathSync(newPath);
  }
  override get bleuMarbel(): 'blue' {
    return 'blue';
  }
  static from(customFileSystemPathSync: CustomFileSystemPathSync) {
    return new CustomFileSystemPathSync(customFileSystemPathSync.path);
  }
  constructor(_newPath: PathLike) {
    super(_newPath, true);
  }

  get realpath(): CustomFileSystemPathSync {
    if (this._sync) {
      return of(realpathSync(this.path));
    }
    throw new Error('NEVER');
  }
  realpathSync(options?: EncodingOption): CustomFileSystemPathSync {
    return of(fs.realpathSync(this.path, options));
  }
  access(mode?: number): void {
    return fs.accessSync(this.path, mode);
  }

  chmod(mode: Mode): void {
    return fs.chmodSync(this.path, mode);
  }
  chown(uid: number, gid: number): void {
    return fs.chownSync(this.path, uid, gid);
  }

  get exists(): boolean {
    return fs.existsSync(this.path);
  }

  lchown(uid: number, gid: number): void {
    return fs.lchownSync(this.path, uid, gid);
  }
  lutimes(atime: TimeLike, mtime: TimeLike): void {
    return fs.lutimesSync(this.path, atime, mtime);
  }

  lstat(options?: undefined): Stats;
  lstat(
    options?: StatSyncOptions & {
      bigint?: false | undefined;
      throwIfNoEntry: false;
    }
  ): Stats | undefined;
  lstat(
    options: StatSyncOptions & {
      bigint: true;
      throwIfNoEntry: false;
    }
  ): BigIntStats | undefined;
  lstat(
    options?: StatSyncOptions & {
      bigint?: false | undefined;
    }
  ): Stats;
  lstat(
    options: StatSyncOptions & {
      bigint: true;
    }
  ): BigIntStats;
  lstat(
    options: StatSyncOptions & {
      bigint: boolean;
      throwIfNoEntry?: false | undefined;
    }
  ): Stats | BigIntStats;
  lstat(options?: StatSyncOptions): Stats | BigIntStats | undefined {
    return fs.lstatSync(this.path, options);
  }
  static mkdirSync(
    path: PathLike,
    options: MakeDirectoryOptions & {
      recursive: true;
    }
  ): string | undefined {
    return fs.mkdirSync(path, options);
  }
  static mkdtempSync(
    prefix: string,
    options?: EncodingOption
  ): CustomFileSystemPathSync {
    return of(fs.mkdtempSync(prefix, options));
  }
  // opendirSync(options?: OpenDirOptions): Dir {
  //   return fs.opendirSync(this.path, options);
  // }
  // openSync(flags: OpenMode, mode?: Mode | null): number {
  //   return fs.openSync(this.path, flags, mode);
  // }

  // readdirSync(
  //       path: PathLike,
  //       options: ObjectEncodingOptions & {
  //           withFileTypes: true;
  //       }
  //   ): Dirent[];
  readdirSync(
    options?:
      | {
          encoding: BufferEncoding | null;
          withFileTypes?: boolean | undefined;
        }
      | BufferEncoding
      | null
  ): CustomFileSystemPathSync[] {
    if (options) {
      if (typeof options !== 'string') {
        return options.withFileTypes === false
          ? fs
              .readdirSync(this.path, { ...options, withFileTypes: false })
              .map(dir => of(dir))
          : fs
              .readdirSync(this.path, { ...options, withFileTypes: true })
              .map(dir => of(join(this.toString(), dir.name)));
      }
      return fs.readdirSync(this.path, options).map(dir => of(dir));
    }
    return fs.readdirSync(this.path).map(dir => of(dir));
  }

  static rmdirSync(path: PathLike, options?: RmDirOptions): void {
    return fs.rmdirSync(path, options);
  }
  static rmSync(path: PathLike, options?: RmOptions): void {
    return fs.rmSync(path, options);
  }

  // statSync(
  //   options?: StatSyncOptions & {
  //     bigint?: false | undefined;
  //     throwIfNoEntry: false;
  //   }
  // ): Stats | undefined;
  // statSync(
  //   options: StatSyncOptions & {
  //     bigint: true;
  //     throwIfNoEntry: false;
  //   }
  // ): BigIntStats | undefined;
  // statSync(
  //   options?: StatSyncOptions & {
  //     bigint?: false | undefined;
  //   }
  // ): Stats;
  // statSync(
  //   options: StatSyncOptions & {
  //     bigint: true;
  //   }
  // ): BigIntStats;
  // statSync(
  //   options: StatSyncOptions & {
  //     bigint: boolean;
  //     throwIfNoEntry?: false | undefined;
  //   }
  // ): Stats | BigIntStats;
  get stats(): Stats | null {
    if (this._stats === null) {
      try {
        this._stats =
          fs.statSync(this.path, { throwIfNoEntry: false, bigint: false }) ||
          null;
      } catch {
        return null;
      }
    }
    return this._stats;
  }

  isFile(): boolean | null {
    return this.stats?.isFile() || null;
  }
  isDirectory(): boolean | null {
    return this.stats?.isDirectory() || null;
  }
  isBlockDevice(): boolean | null {
    return this.stats?.isBlockDevice() || null;
  }
  isCharacterDevice(): boolean | null {
    return this.stats?.isCharacterDevice() || null;
  }
  isSymbolicLink(): boolean | null {
    return this.stats?.isSymbolicLink() || null;
  }
  isFIFO(): boolean | null {
    return this.stats?.isFIFO() || null;
  }
  isSocket(): boolean | null {
    return this.stats?.isSocket() || null;
  }
  get dev(): number | null {
    return this.stats?.dev || null;
  }
  get ino(): number | null {
    return this.stats?.ino || null;
  }
  get mode(): number | null {
    return this.stats?.mode || null;
  }
  get nlink(): number | null {
    return this.stats?.nlink || null;
  }
  get uid(): number | null {
    return this.stats?.uid || null;
  }
  get gid(): number | null {
    return this.stats?.gid || null;
  }
  get rdev(): number | null {
    return this.stats?.rdev || null;
  }
  get size(): number | null {
    return this.stats?.size || null;
  }
  get blksize(): number | null {
    return this.stats?.blksize || null;
  }
  get blocks(): number | null {
    return this.stats?.blocks || null;
  }
  get atimeMs(): number | null {
    return this.stats?.atimeMs || null;
  }
  get mtimeMs(): number | null {
    return this.stats?.mtimeMs || null;
  }
  get ctimeMs(): number | null {
    return this.stats?.ctimeMs || null;
  }
  get birthtimeMs(): number | null {
    return this.stats?.birthtimeMs || null;
  }
  get atime(): Date | null {
    return this.stats?.atime || null;
  }
  get mtime(): Date | null {
    return this.stats?.mtime || null;
  }
  get ctime(): Date | null {
    return this.stats?.ctime || null;
  }
  get birthtime(): Date | null {
    return this.stats?.birthtime || null;
  }
  get bigIntStats(): BigIntStats | null {
    if (this._stats === null) {
      try {
        this._bigIntStats =
          fs.statSync(this.path, { throwIfNoEntry: false, bigint: true }) ||
          null;
      } catch {
        return null;
      }
    }
    return this._bigIntStats;
  }

  truncateSync(len?: number | null): void {
    return fs.truncateSync(this.path, len);
  }
  unlinkSync(): void {
    return fs.unlinkSync(this.path);
  }
  utimesSync(atime: TimeLike, mtime: TimeLike): void {
    return fs.utimesSync(this.path, atime, mtime);
  }

  static appendFileSync(
    path: PathOrFileDescriptor,
    data: string | Uint8Array,
    options?: WriteFileOptions
  ): void {
    return fs.appendFileSync(path, data, options);
  }
  static closeSync(fd: number): void {
    return fs.closeSync(fd);
  }
  static copyFileSync(src: PathLike, dest: PathLike, mode?: number): void {
    return fs.copyFileSync(src, dest, mode);
  }
  static cpSync(
    source: string | URL,
    destination: string | URL,
    opts?: CopySyncOptions
  ): void {
    return fs.cpSync(source, destination, opts);
  }

  static fchmodSync(fd: number, mode: Mode): void {
    return fs.fchmodSync(fd, mode);
  }
  static fchownSync(fd: number, uid: number, gid: number): void {
    return fs.fchownSync(fd, uid, gid);
  }
  static fdatasyncSync(fd: number): void {
    return fs.fdatasyncSync(fd);
  }
  static fstatSync(
    fd: number,
    options?: StatOptions & {
      bigint?: false | undefined;
    }
  ): Stats;
  static fstatSync(
    fd: number,
    options: StatOptions & {
      bigint: true;
    }
  ): BigIntStats;
  static fstatSync(fd: number, options?: StatOptions): Stats | BigIntStats {
    return fs.fstatSync(fd, options);
  }
  static fsyncSync(fd: number): void {
    return fs.fsyncSync(fd);
  }
  static ftruncateSync(fd: number, len?: number | null): void {
    return fs.ftruncateSync(fd, len);
  }
  static futimesSync(fd: number, atime: TimeLike, mtime: TimeLike): void {
    return fs.futimesSync(fd, atime, mtime);
  }
  static linkSync(existingPath: PathLike, newPath: PathLike): void {
    return fs.linkSync(existingPath, newPath);
  }
  static readFileSync(
    path: PathOrFileDescriptor,
    options?: {
      encoding?: null | undefined;
      flag?: string | undefined;
    } | null
  ): Buffer {
    return fs.readFileSync(path, options);
  }
  readlinkSync(options?: EncodingOption): CustomFileSystemPathSync {
    return of(fs.readlinkSync(this.path, options));
  }
  static readSync(
    fd: number,
    buffer: NodeJS.ArrayBufferView,
    offset: number,
    length: number,
    position: ReadPosition | null
  ): number {
    return fs.readSync(fd, buffer, offset, length, position);
  }
  static readvSync(
    fd: number,
    buffers: ReadonlyArray<NodeJS.ArrayBufferView>,
    position?: number
  ): number {
    return fs.readvSync(fd, buffers, position);
  }

  static renameSync(oldPath: PathLike, newPath: PathLike): void {
    return fs.renameSync(oldPath, newPath);
  }
  static symlinkSync(
    target: string | Buffer | URL,
    path: string | Buffer | URL,
    type?: symlink.Type | null
  ): void {
    return fs.symlinkSync(target, path, type);
  }
  static writeFileSync(
    file: PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    options?: WriteFileOptions
  ): void {
    return fs.writeFileSync(file, data, options);
  }
  static writeSync(
    fd: number,
    buffer: NodeJS.ArrayBufferView,
    offset?: number | null,
    length?: number | null,
    position?: number | null
  ): number {
    return fs.writeSync(fd, buffer, offset, length, position);
  }
  static writevSync(
    fd: number,
    buffers: ReadonlyArray<NodeJS.ArrayBufferView>,
    position?: number
  ): number {
    return fs.writevSync(fd, buffers, position);
  }
  /**
   * Changes the permissions on a symbolic link. Returns `undefined`.
   *
   * This method is only implemented on macOS.
   *
   * See the POSIX [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2) documentation for more detail.
   * @deprecated Since v0.4.7
   */
  //    lchmodSync(path: PathLike, mode: Mode): void
  //   {return fs.lchmodSync(path, mode);
  // }
}

export interface ICustomFileSystemPath_ {
  //   // /* TODO: add the missing return type */
  //   // of(newPath: string): any;
  //   // /* TODO: add the missing return type */
  //   // from(customFileSystemPathSync: CustomFileSystemPathSync): any;
  get realpath(): CustomFileSystemPathSync;
  realpathSync(options?: EncodingOption): CustomFileSystemPathSync;
  access(mode?: number): void;
  chmod(mode: Mode): void;
  chown(uid: number, gid: number): void;
  get exists(): boolean;
  lchown(uid: number, gid: number): void;
  lutimes(atime: TimeLike, mtime: TimeLike): void;
  lstat(options?: StatSyncOptions): Stats | BigIntStats | undefined;
  // mkdirSync(
  //   path: PathLike,
  //   options: MakeDirectoryOptions & {
  //     recursive: true;
  //   }
  // ): string | undefined;
  // mkdtempSync(
  //   prefix: string,
  //   options?: EncodingOption
  // ): CustomFileSystemPathSync;
  // readdirSync(
  //   options?:
  //     | {
  //         encoding: BufferEncoding | null;
  //         withFileTypes?: boolean | undefined;
  //       }
  //     | BufferEncoding
  //     | null
  // ): CustomFileSystemPathSync[];
  // rmdirSync(path: PathLike, options?: RmDirOptions): void;
  // rmSync(path: PathLike, options?: RmOptions): void;
  get stats(): Stats | null;
  isFile(): boolean | null;
  isDirectory(): boolean | null;
  isBlockDevice(): boolean | null;
  isCharacterDevice(): boolean | null;
  isSymbolicLink(): boolean | null;
  isFIFO(): boolean | null;
  isSocket(): boolean | null;
  get dev(): number | null;
  get ino(): number | null;
  get mode(): number | null;
  get nlink(): number | null;
  get uid(): number | null;
  get gid(): number | null;
  get rdev(): number | null;
  get size(): number | null;
  get blksize(): number | null;
  get blocks(): number | null;
  get atimeMs(): number | null;
  get mtimeMs(): number | null;
  get ctimeMs(): number | null;
  get birthtimeMs(): number | null;
  get atime(): Date | null;
  get mtime(): Date | null;
  get ctime(): Date | null;
  get birthtime(): Date | null;
  get bigIntStats(): BigIntStats | null;
  truncateSync(len?: number | null): void;
  unlinkSync(): void;
  utimesSync(atime: TimeLike, mtime: TimeLike): void;
  //   appendFileSync(
  //     path: PathOrFileDescriptor,
  //     data: string | Uint8Array,
  //     options?: WriteFileOptions
  //   ): void;
  // closeSync(fd: number): void;
  //   copyFileSync(src: PathLike, dest: PathLike, mode?: number): void;
  //   cpSync(
  //     source: string | URL,
  //     destination: string | URL,
  //     opts?: CopySyncOptions
  //   ): void;
  //   fchmodSync(fd: number, mode: Mode): void;
  //   fchownSync(fd: number, uid: number, gid: number): void;
  //   fdatasyncSync(fd: number): void;
  //   fstatSync(fd: number, options?: StatOptions): Stats | BigIntStats;
  //   fsyncSync(fd: number): void;
  //   ftruncateSync(fd: number, len?: number | null): void;
  //   futimesSync(fd: number, atime: TimeLike, mtime: TimeLike): void;
  //   linkSync(existingPath: PathLike, newPath: PathLike): void;
  //   readFileSync(
  //     path: PathOrFileDescriptor,
  //     options?: {
  //       encoding?: null | undefined;
  //       flag?: string | undefined;
  //     } | null
  //   ): Buffer;
  //   readlinkSync(options?: EncodingOption): CustomFileSystemPathSync;
  //   readSync(
  //     fd: number,
  //     buffer: NodeJS.ArrayBufferView,
  //     offset: number,
  //     length: number,
  //     position: ReadPosition | null
  //   ): number;
  //   readvSync(
  //     fd: number,
  //     buffers: ReadonlyArray<NodeJS.ArrayBufferView>,
  //     position?: number
  //   ): number;
  //   renameSync(oldPath: PathLike, newPath: PathLike): void;
  //   symlinkSync(
  //     target: string | Buffer | URL,
  //     path: string | Buffer | URL,
  //     type?: symlink.Type | null
  //   ): void;
  //   writeFileSync(
  //     file: PathOrFileDescriptor,
  //     data: string | NodeJS.ArrayBufferView,
  //     options?: WriteFileOptions
  //   ): void;
  //   writeSync(
  //     fd: number,
  //     buffer: NodeJS.ArrayBufferView,
  //     offset?: number | null,
  //     length?: number | null,
  //     position?: number | null
  //   ): number;
  //   writevSync(
  //     fd: number,
  //     buffers: ReadonlyArray<NodeJS.ArrayBufferView>,
  //     position?: number
  //   ): number;
}

export function from(customFileSystemPathSync: CustomFileSystemPathSync) {
  return CustomFileSystemPathSync.from(customFileSystemPathSync);
}
export function of(newPath: string) {
  return CustomFileSystemPathSync.of(newPath);
}
