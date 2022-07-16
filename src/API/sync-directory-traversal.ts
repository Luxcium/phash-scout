/* *************************************************************************** */
/* *                                                                         * */
/* *   MIT License                                                           * */
/* *   Copyright webstrand © 2022                                            * */
/* *   https://gist.github.com/webstrand/46e7de2319a5aad77da443e3fd50a82d    * */
/* *   (Revision:  1100077cf56fa2532b6c0dd2c94ccb9f3718d79b)                 * */
/* *   Fast Synchronous Directory Traversal using chdir                      * */
/* *                                                                         * */
/* *   Midified by Luxcium                                                   * */
/* *   Copyright Luxcium © 2022                                              * */
/* *                                                                         * */
/* *   The above copyright notice and this permission notice shall be        * */
/* *   included in all copies or substantial portions of the Software.       * */
/* *                                                                         * */
/* *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,       * */
/* *   EXPRESS OR IMPLIED INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF     * */
/* *   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE [... MIT License ]  * */
/* *                                                                         * */
/* *************************************************************************** */

import { opendirSync } from 'node:fs';
import { constants } from 'node:os';
import { chdir } from 'node:process';

const count = { a: 0 };
const timeThen = performance.now();
const timeNow = () => performance.now();
const timeSinceThen = () => timeNow() - timeThen;

// doTraverseDirs(process.argv[2]);
// exit(0);

export function doTraverseDirs(
  dir: string,
  sideFunction: <T>(...args: any[]) => T,
  verbose = true
) {
  const parents: string[] = [];
  let cwd = '';

  const queue = [dir];
  while (queue.length > 0) traverse() && scan();
  return;

  /**
   * Scans the current directory
   */
  function scan() {
    const dir = opendirSync('.', {});

    for (let ent = dir.readSync(); ent !== null; ent = dir.readSync()) {
      const ms = timeSinceThen();

      if (ent.isDirectory()) {
        queue.push(ent.name);
      } else {
        // TODO: //-* ------------------------------------------------
        //       //-* Add the side effect on files here !!!
        sideFunction(`${cwd}/${ent.name}`);
        verbose &&
          console.log(
            [++count.a, (ms / count.a).toFixed(2)],
            `${cwd}/${ent.name}`
          );
      }
    }
    dir.closeSync();
  }

  /**
   * Changes to a new working directory
   * Returns true if the directory should be scanned
   */
  function traverse() {
    const next = queue.pop()!;
    try {
      chdir(next);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (hasKey(error, 'errno')) {
          if (error.errno === -constants.errno.EACCES) {
            verbose && console.error('skipping', next, error);
            return false;
          }
        }
      }
      throw error;
    }

    if (next === '..') {
      cwd = cwd.slice(0, -(parents.pop()!.length + 1));
      return false;
    } else {
      parents.push(next);
      cwd = cwd.length === 0 ? next : `${cwd}/${next}`;
      verbose && console.log(cwd);
      queue.push('..');
      return true;
    }
  }
}

function hasKey<K extends PropertyKey>(
  o: unknown,
  key: K
): o is { [P in K]: unknown } {
  return typeof o === 'object' && o !== null && key in o;
}

/*
 */
