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

import { opendir } from 'node:fs/promises';
import { constants } from 'node:os';
import { normalize } from 'node:path';
import { chdir } from 'node:process';

import { logHigh, logLow } from '../../constants';

export class ScanDirs {
  _cwd: { path: string };
  _parents: string[];
  _queue: string[];

  static from(absolutePath: string) {
    return new ScanDirs(absolutePath);
  }
  static scanFrom(absolutePath: string) {
    return new ScanDirs(absolutePath).scan();
  }
  constructor(private _absolutePath: string) {
    this._parents = [];
    this._cwd = { path: '' };
    this._queue = [this._absolutePath];
  }
  public get scan() {
    const self = this;
    return async function* () {
      while (self._queue.length > 0) {
        const traverse = self._traverse();
        console.log('traverse is:', traverse);
        if (traverse) {
          console.log('traverse is true:', traverse);
          yield* (await self._scanGenerator())();
        }
        console.log('traverse is:', traverse);
      }
      return false;
    };
  }
  private _traverse() {
    const next = this._queue.pop()!;
    try {
      chdir(next);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (this._hasKey(error, 'errno')) {
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
      this._cwd.path = this._cwd.path.slice(
        0,
        -(this._parents.pop()!.length + 1)
      );
      return false;
    } else {
      this._parents.push(next);
      this._cwd.path =
        this._cwd.path.length === 0
          ? next
          : normalize(`${this._cwd.path}/${next}`);
      logHigh(this._cwd.path);
      this._queue.push('..');
      return true;
    }
  }

  private async _scanGenerator() {
    const d = await opendir('.', {});
    const self = this;
    return async function* (): AsyncGenerator<string, boolean, unknown> {
      for (let ent = await d.read(); ent !== null; ent = await d.read()) {
        if (ent.isDirectory()) {
          self._queue.push(ent.name);
        } else {
          const fullPath = normalize(`${self._cwd.path}/${ent.name}`);
          yield fullPath;
        }
      }
      d.close();
      return false;
    };
  }
  private _hasKey<K extends PropertyKey>(
    o: unknown,
    key: K
  ): o is { [P in K]: unknown } {
    return typeof o === 'object' && o !== null && key in o;
  }
}

async function main() {
  const scan = ScanDirs.scanFrom('/home/luxcium');
  // const { scan } = traverseDirs;

  for await (const file of scan) {
    console.log(file);
  }
}
main();
