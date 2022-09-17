import { constants } from 'node:fs';
import * as fs from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import os from 'node:os';
import path, { join } from 'node:path';
import { chdir, cwd } from 'node:process';

import { logError, logInfo } from '../../constants';
import { CustomFileSystemPathSync } from './CustomFileSystemPathSync';
import { ICustomFileSystemPath } from './ICustomFileSystemPath';

const source =
  '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/recent backups (Jully 2022)/test';
export const testObj: ICustomFileSystemPath = new CustomFileSystemPathSync(
  source
);

testObj.realpath;
// interface Extracted {
//   realpath(): string | Promise<string>;
//   /* TODO: add the missing return type */
//   path(): any;
//   root(): string;
//   dir(): string;
//   base(): string;
//   ext(): string;
//   name(): string;
// }

void (async function main() {
  logInfo(await fs.realpath(source), `fs.realpath(${source})`);
  logInfo(await fs.stat(source), `fs.stat(${source})`);
  logInfo(path.parse(source), `path.parse(${source})`);
  logInfo((await fs.readdir(source)).length, `length: fs.readdir(${source})`);
  logInfo(
    (
      await fs.readdir(source, {
        withFileTypes: true,
      })
    ).length,
    `length withFileTypes: fs.readdir(${source})`
  );

  // eslint-disable-next-line no-constant-condition
  if (!null) return; // HACK:

  try {
    let tempdir = await fs.mkdtemp(join(os.tmpdir(), 'pHash-scout-'));
    chdir(tempdir);
  } catch (error) {
    logError(error);
  }

  try {
    const projectFolder = join(cwd(), 'jpgs');
    await mkdir(projectFolder, { recursive: true });
    chdir(projectFolder);
    console.log(`Now into: ${cwd()}`);
  } catch (error) {
    logError(error);
  }

  // try {
  //   console.log(await fs.stat(tmpSRC));
  // } catch (error) {
  //   logError(error, `at fs.stat(${tmpSRC})`);

  //   try {
  //     await fs.cp(join(os.tmpdir(), 'pHash-scout-'));
  //   } catch (error) {
  //     logError(error);
  //   }

  // }
  const path_ = '/tmp/jpgs';
  const filename_ = '00-photo_2@23-11-2020_09-06-53.jpg';
  let src = `${path_}/${filename_}`;
  let dest = `${cwd()}/${filename_}`;
  let dest_link = `${cwd()}/link-${filename_}`;
  try {
    console.log(await fs.copyFile(src, dest));
  } catch (error) {
    logError(error, 'at fs.copyFile');
  }
  try {
    console.log(await fs.link(src, dest_link));
  } catch (error) {
    logError(
      `fs.link from src: ${src}\nto ${dest_link}\n${error}`,
      'at fs.link'
    );
  }
  fs.access;
  fs.appendFile;
  fs.chmod;
  fs.chown;
  fs.copyFile;
  fs.cp;
  fs.lchown;
  fs.lutimes;
  fs.link;
  fs.lstat;
  fs.mkdir;
  fs.mkdtemp;
  fs.open;
  fs.opendir;
  fs.readdir;
  fs.readFile;
  fs.readlink;
  fs.realpath;
  fs.rename;
  fs.rmdir;
  fs.rm;
  fs.stat;
  fs.symlink;
  fs.truncate;
  fs.unlink;
  fs.utimes;
  fs.watch;
  fs.writeFile;
  constants;
})();

/*
fs.access(path[, mode])
fs.appendFile(path, data[, options])
fs.chmod(path, mode)
fs.chown(path, uid, gid)
fs.copyFile(src, dest[, mode])
fs.cp(src, dest[, options])
fs.lchmod(path, mode)
fs.lchown(path, uid, gid)
fs.lutimes(path, atime, mtime)
fs.link(existingPath, newPath)
fs.lstat(path[, options])
fs.mkdir(path[, options])
fs.mkdtemp(prefix[, options])
fs.open(path, flags[, mode])
fs.opendir(path[, options])
fs.readdir(path[, options])
fs.readFile(path[, options])
fs.readlink(path[, options])
fs.realpath(path[, options])
fs.rename(oldPath, newPath)
fs.rmdir(path[, options])
fs.rm(path[, options])
fs.stat(path[, options])
fs.symlink(target, path[, type])
fs.truncate(path[, len])
fs.unlink(path)
fs.utimes(path, atime, mtime)
fs.watch(filename[, options])
fs.writeFile(file, data[, options])
fs.constants
 */
