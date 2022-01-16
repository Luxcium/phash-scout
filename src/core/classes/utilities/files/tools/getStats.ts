import { Stats } from 'fs-extra';
import { stat } from 'fs/promises';
import { immediateZalgo } from '../..';

export function getStats(pathStr: string) {
  let stats: null | Promise<Stats> = null;

  async function _getStats() {
    if (stats === null) {
      stats = stat(pathStr);
    }
    return immediateZalgo(stats);
  }

  return {
    dev: async () => (await _getStats()).dev,
    ino: async () => (await _getStats()).ino,
    mode: async () => (await _getStats()).mode,
    nlink: async () => (await _getStats()).nlink,
    uid: async () => (await _getStats()).uid,
    gid: async () => (await _getStats()).gid,
    rdev: async () => (await _getStats()).rdev,
    size: async () => (await _getStats()).size,
    blksize: async () => (await _getStats()).blksize,
    blocks: async () => (await _getStats()).blocks,
    atimeMs: async () => (await _getStats()).atimeMs,
    mtimeMs: async () => (await _getStats()).mtimeMs,
    ctimeMs: async () => (await _getStats()).ctimeMs,
    birthtimeMs: async () => (await _getStats()).birthtimeMs,
    atime: async () => (await _getStats()).atime,
    mtime: async () => (await _getStats()).mtime,
    ctime: async () => (await _getStats()).ctime,
    birthtime: async () => (await _getStats()).birthtime,
  };
}
