import { Dirent } from 'fs';
import { Stats } from 'fs-extra';
import { readdir, stat } from 'fs/promises';
import { Tedis } from 'tedis';
import { immediateZalgo } from '../..';
import { devPaths } from '../files';

const exit = process.exit;
const RDSServer_: () => Tedis = () =>
  new Tedis({
    port: 6382,
  });
const prefix_: string = 'test_123b';
// const jsonPath: string = '.';
const key_: string = devPaths.PATH6a;
// const value: string | number | Date = '"test-value-for-Key0123b"';
// const close: 'close' | boolean = false;
export async function setJson({
  prefix,
  jsonPath,
  keyID,
  value,
  RDSServer,
}: {
  prefix: string;
  jsonPath: string;
  keyID: string;
  value: string | number;
  RDSServer: Tedis;
}) {
  const shortKey = `${prefix}::${keyID}`;
  const variant = '::3333';
  const fullKey = shortKey + variant;
  const rootJsonPath = '.';
  const initialValue = `{}`;
  const thisValue = `{}`;
  void thisValue, initialValue;
  try {
    if (
      null ===
      (await RDSServer.command('JSON.GET', fullKey, rootJsonPath).then(val => {
        console.log('val:', val);
        return val;
      }))
    ) {
      await RDSServer.command('JSON.SET', fullKey, rootJsonPath, initialValue);
    }
    await RDSServer.command('JSON.SET', fullKey, rootJsonPath, initialValue);

    // console.log('is set:');
    // console.log('JSON.SET');
    // console.log('fullKey,', fullKey);
    // console.log('jsonPath', `.${Date().toString().replaceAll(' ', '-')}`); // `.${Date().toString().replace(' ', '-')}`,
    // console.log(
    //   await RDSServer.command('JSON.GET', fullKey, rootJsonPath),
    //   await RDSServer.command(
    //     'JSON.SET',
    //     fullKey,
    //     `.x${Date.now()}`,
    //     '"lol"'
    //     // `'"${Date.now().toString().replace(' ', '-')}"'`
    //   ),
    //   'JSON.SET',
    //   fullKey,
    //   `.${Date().toString().replace(' ', '-')}`,
    //   '"lol"'
    //   // `'"${Date.now().toString().replace(' ', '-')}"'`
    // );

    exit(123);
  } catch (error) {
    console.error(error);
    exit(234);
  }

  const setResult = await RDSServer.command(
    'JSON.SET',
    shortKey,
    jsonPath,
    `${value}`
  );
  const getBackValue = await RDSServer.command('JSON.GET', shortKey, jsonPath);
  const results = {
    result: [setResult, getBackValue],
    redis: {
      command: 'JSON.SET',
      atKey: shortKey,
      atJsonPath: jsonPath,
      sentValue: `${value}`,
      setResult,
      getBackValue,
    },
  };
  console.log(results);
  RDSServer.close();
  return await results;
}
//
const RDSServerJsonSetter =
  (RDSServer: () => Tedis) =>
  (prefix: string) =>
  (keyID: string) =>
  (jsonPath: string) =>
  (value: string | number) =>
    setJson({ jsonPath, prefix, keyID, value, RDSServer: RDSServer() });

const stats = getStats(devPaths.PATH6a);

const {
  dev,
  ino,
  mode,
  nlink,
  uid,
  gid,
  rdev,
  size,
  blksize,
  blocks,
  atimeMs,
  mtimeMs,
  ctimeMs,
  birthtimeMs,
  atime,
  mtime,
  ctime,
  birthtime,
} = stats;
const getAllStatsList: [string, any][] = [
  ['.dev', dev],
  ['.ino', ino],
  ['.mode', mode],
  ['.nlink', nlink],
  ['.uid', uid],
  ['.gid', gid],
  ['.rdev', rdev],
  ['.size', size],
  ['.blksize', blksize],
  ['.blocks', blocks],
  ['.atimeMs', atimeMs],
  ['.mtimeMs', mtimeMs],
  ['.ctimeMs', ctimeMs],
  ['.birthtimeMs', birthtimeMs],
  ['.atime', atime],
  ['.mtime', mtime],
  ['.ctime', ctime],
  ['.birthtime', birthtime],
];

const RDSServerJsonSetterStage2 =
  RDSServerJsonSetter(RDSServer_)(prefix_)(key_);
void RDSServerJsonSetterStage2, key_, prefix_;

void main;
main();
function main() {
  getAllStatsList.slice(0, 1).map(async ([jPath, getValue]: [any, any]) => {
    return RDSServerJsonSetterStage2(jPath)(await getValue());
  });
}

// void RDSServer;
// void prefix;
void RDSServerJsonSetter;
void getAllStatsList;
void RDSServer_;
// void close;

export async function getRawDirList(pathSrc: string) {
  const dirListing: Dirent[] = await readdir(pathSrc, {
    withFileTypes: true,
  });
  return dirListing;
}

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
