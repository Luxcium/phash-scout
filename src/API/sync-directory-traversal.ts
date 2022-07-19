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
import { chdir } from 'node:process';

import { SideFunctionParam } from '../types';

const count = { a: 0 };
const timeThen = performance.now();
const timeNow = () => performance.now();
const timeSinceThen = () => timeNow() - timeThen;

export async function doTraverseDirs(
  absolutePath: string,
  sideFunction: (...args: any[]) => Promise<string>,
  verbose = false
) {
  const parents_ς: string[] = [];
  let cwd_ς = { path: '' };

  const queue_ς = [absolutePath];
  while (queue_ς.length > 0) {
    traverse(queue_ς, parents_ς, cwd_ς, true, verbose) &&
      (await scan(queue_ς, sideFunction, cwd_ς, true));
  }
  return;
}

export const SYNC = true;
export const AWAIT = true;

/**
 * Scans the current directory
 */
async function scan(
  queue: string[],
  sideFunction: <T extends SideFunctionParam>(args: T) => Promise<string>,
  cwd: { path: string },
  debug = true
) {
  // const dir =
  const dir = AWAIT ? await opendir('.', {}) : opendirSync('.', {});
  for (let ent = dir.readSync(); ent !== null; ent = dir.readSync()) {
    const ms = timeSinceThen();
    if (ent.isDirectory()) {
      queue.push(ent.name);
    } else {
      const fullPath = `${cwd.path}/${ent.name}`;

      // HACK: //-! ------- Add the side effect on files here --------

      !AWAIT
        ? await sideFunction({ fullPath, ms, count, debug })
        : sideFunction({ fullPath, ms, count, debug });

      // : : : //-! --------------------------------------------------
    }
  }

  !SYNC ? dir.closeSync() : !AWAIT ? await dir.close() : dir.close();
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
          debug && console.error('skipping', next, error);
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
    cwd.path = cwd.path.length === 0 ? next : `${cwd.path}/${next}`;
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
