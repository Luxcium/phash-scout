/* ************************************************************************** */
/* *                                                                        * */
/* *  MIT License                                                           * */
/* *  Copyright webstrand © 2022                                            * */
/* *  https://gist.github.com/webstrand/46e7de2319a5aad77da443e3fd50a82d    * */
/* *  (Revision:  1100077cf56fa2532b6c0dd2c94ccb9f3718d79b)                 * */
/* *  Fast Synchronous Directory Traversal using chdir                      * */
/* *                                                                        * */
/* *  Midified by Luxcium                                                   * */
/* *  Copyright Luxcium © 2022                                              * */
/* *                                                                        * */
/* *  The above copyright notice and this permission notice shall be        * */
/* *  included in all copies or substantial portions of the Software.       * */
/* *                                                                        * */
/* *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,       * */
/* *  EXPRESS OR IMPLIED INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF     * */
/* *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE [... MIT License ]  * */
/* *                                                                        * */
/* ************************************************************************** */

import { opendirSync } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { constants } from 'node:os';
import { normalize } from 'node:path';
import { chdir } from 'node:process';

import { SideFunctionParam } from '../types';

// const timeThen = performance.now();
// const timeNow = () => performance.now();
// const timeSinceThen = () => timeNow() - timeThen;
// timeSinceThen;

const count = {
  a: 0,
};

const isOpenDirSYNC = true;
const isReadSYNC = true;
const isCloseDirSYNC = false;

export async function doTraverseDirs(
  absolutePath: string,
  sideFunction: (args: SideFunctionParam) => Promise<unknown>,
  flags: { [keys: string]: boolean },
  counts: any
) {
  const { VERBOSE, DEBUGS, AWAITS } = flags;
  const parents_ς: string[] = [];
  let cwd_ς = { path: '' };

  const queue_ς = [absolutePath];
  while (queue_ς.length > 0) {
    traverse(queue_ς, parents_ς, cwd_ς, DEBUGS, VERBOSE) &&
      (await scan(queue_ς, sideFunction, cwd_ς, DEBUGS, AWAITS, counts));
  }
  return;
}

/**
 * Scans the current directory
 */
async function scan(
  queue: string[],
  sideFunction: (args: SideFunctionParam) => Promise<unknown>,
  cwd: { path: string },
  DEBUGS = true,
  AWAITS = true,
  counts: any
) {
  const dir = isOpenDirSYNC ? opendirSync('.', {}) : await opendir('.', {});
  for (
    /* FOR LOOP */ let ent = isReadSYNC ? dir.readSync() : await dir.read();
    /* FOR LOOP */ ent !== null;
    /* FOR LOOP */ ent = isReadSYNC ? dir.readSync() : await dir.read()
  ) {
    if (ent.isDirectory()) {
      queue.push(ent.name);
    } else {
      const fullPath = normalize(`${cwd.path}/${ent.name}`);
      // HACK:- //-! ------- Add the side effect on files here -------
      try {
        /*eslint no-constant-condition: "off"*/
        void AWAITS;
        console.log('counts.await++', ++counts.await);
        counts.await % 1000 === 0
          ? await sideFunction({ fullPath, count, DEBUGS })
          : sideFunction({ fullPath, count, DEBUGS });
      } catch (error) {
        console.error(error);
      }
      // : : : //-! --------------------------------------------------
    }
  }

  const noAWAIT = false;
  isCloseDirSYNC ? dir.closeSync() : noAWAIT ? dir.close() : await dir.close();
}

/**
 * Changes to a new working directory
 * Returns true if the directory should be scanned
 */
function traverse(
  queue: string[],
  parents: string[],
  cwd: { path: string },
  debug = true,
  verbose = false
) {
  const next = queue.pop()!;
  try {
    chdir(next);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (hasKey(error, 'errno')) {
        if (error.errno === -constants.errno.EACCES) {
          debug && console.error('EACCES: skipping', next, error);
          return false;
        }
        if (error.errno === -constants.errno.ENOENT) {
          debug && console.error('ENOENT: skipping', next, error);
          return false;
        }
      }
    }
    throw error;
  }

  if (next === '..') {
    cwd.path = cwd.path.slice(0, -(parents.pop()!.length + 1));
    return false;
  } else {
    parents.push(next);
    cwd.path = cwd.path.length === 0 ? next : normalize(`${cwd.path}/${next}`);
    verbose && console.log(cwd.path);
    queue.push('..');
    return true;
  }
}
function hasKey<K extends PropertyKey>(
  o: unknown,
  key: K
): o is { [P in K]: unknown } {
  return typeof o === 'object' && o !== null && key in o;
}
