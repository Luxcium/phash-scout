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
let count3 = 1;
let count4 = 1;
let count5 = 1;
let count6 = 1;
let timeThen3 = performance.now();
let timeThen4 = performance.now();
let timeThen5 = performance.now();
let timeThen6 = performance.now();
let perform1 = '1';
/**
 * Scans the current directory
 */
// [363505] 0.24    0.28
// const openSync = true;
// const closeSync = true;
// const sideAwait = true;
export const ASYNC = false;
export const SYNC = true;
export const AWAIT = true;

// const openSync = ASYNC;
// const closeSync = SYNC;
// const sideAwait = AWAIT;
async function scan(
  queue: string[],
  sideFunction: (...args: any[]) => Promise<string>,
  cwd: { path: string },
  debug = true
) {
  // const dir =
  const dir = ASYNC ? opendirSync('.', {}) : await opendir('.', {});
  for (let ent = dir.readSync(); ent !== null; ent = dir.readSync()) {
    const ms = timeSinceThen();
    if (ent.isDirectory()) {
      queue.push(ent.name);
    } else {
      // TODO: //-* ------- Add the side effect on files here --------
      const fullPath = `${cwd.path}/${ent.name}`;
      // console.log
      !AWAIT ? await sideFunction(fullPath) : sideFunction(fullPath);
      debug &&
        process.stdout.write(
          `\u009B33m[\u009B93m${++count.a}\u009B33m] \u009B32m${(
            ms / count.a
          ).toFixed(2)} ${perform1} \u009B37m${fullPath}\u009B0m\n`
        );

      if ((count3 + 5000) % 10_000 === 0) {
        count3 = 1;
        timeThen3 = performance.now();
      }
      if ((count4 + 675) % 5000 === 0) {
        count4 = 1;
        timeThen4 = performance.now();
      }
      if ((count5 + 1250) % 5000 === 0) {
        count5 = 1;
        timeThen5 = performance.now();
      }
      if ((count6 + 2500) % 5000 === 0) {
        count6 = 1;
        timeThen6 = performance.now();
      }
      const perf3 = (performance.now() - timeThen3) / count3++;
      const perf4 = (performance.now() - timeThen4) / count4++;
      const perf5 = (performance.now() - timeThen5) / count5++;
      const perf6 = (performance.now() - timeThen6) / count6++;
      perform1 = ((perf3 + perf4 + perf5 + perf6) / 4)
        .toFixed(2)
        .padStart(7, ' ');
    }
  }

  ASYNC ? dir.closeSync() : dir.close();
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
