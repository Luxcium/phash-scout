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

import { SideFunctionParam } from '@types';
import { opendirSync } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { constants } from 'node:os';
import { normalize } from 'node:path';
import { chdir } from 'node:process';

import { flags, logError, logHigh, logLow } from '../../constants';

const { AWAIT_EACH, isOpenDirSYNC, isReadSYNC, isCloseDirSYNC } = flags;

const count = {
  a: 0,
  b: 0,
};

const DEBUG = false as const;

export async function doTraverseDirs(
  absolutePath: string,
  sideFunction: (args: SideFunctionParam) => Promise<unknown>,
  counts: any = null
) {
  const parents_ς: string[] = [];
  const cwd_ς = { path: '' };
  const queue_ς = [absolutePath];

  while (queue_ς.length > 0) {
    _traverse(queue_ς, parents_ς, cwd_ς) &&
      (await _scan(queue_ς, sideFunction, cwd_ς, counts));
  }
  return;
}
/**
 * Scans the current directory
 */
async function _scan(
  queue: string[],
  sideFunction: (args: SideFunctionParam) => Promise<unknown>,
  cwd: { path: string },
  counts: any = null
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
        counts
          ? counts?.await || 0 % AWAIT_EACH === 0
          : !counts
          ? await sideFunction({ fullPath, count })
          : sideFunction({ fullPath, count });
      } catch (error) {
        logError(String(error), 'ERROR');
      }
      // : : : //-! --------------------------------------------------
    }
  }

  const noAWAIT = true;
  isCloseDirSYNC ? dir.closeSync() : noAWAIT ? dir.close() : await dir.close();
}

/**
 * Changes to a new working directory
 * Returns true if the directory should be scanned
 */
function _traverse(queue: string[], parents: string[], cwd: { path: string }) {
  const next = queue.pop()!;
  try {
    chdir(next);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (hasKey(error, 'errno')) {
        if (error.errno === -constants.errno.EACCES) {
          logLow([next, error].toString(), 'EACCES: skipping');
          return false;
        }
        if (error.errno === -constants.errno.ENOENT) {
          logLow([next, error].toString(), 'ENOENT: skipping');
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
    logHigh(cwd.path);
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

async function test(debug: boolean = false) {
  if (debug) {
    const sideFN = async (sideFunctionParam: SideFunctionParam) => [
      console.dir(sideFunctionParam.count.a++),
      console.dir(sideFunctionParam.fullPath),
    ];

    doTraverseDirs('/media/luxcium/Archive_Locale/import/', sideFN);
    return true as const;
  }
  return false as const;
}
DEBUG && console.log(`DEBUG = ${DEBUG}`, __dirname, __filename);
DEBUG && test(DEBUG);
