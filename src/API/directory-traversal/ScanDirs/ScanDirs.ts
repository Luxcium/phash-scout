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
import { constants } from 'node:os';
import { normalize } from 'node:path';
import { chdir } from 'node:process';

import { logHigh, logLow } from '../../../constants';
import { Mapper } from '../../../types';

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

  static mapFrom<U = unknown>(
    absolutePath: string[] | string,
    transformFn: Mapper<any, U>
    // (path: string) => unknown = (t: string) => t
  ) {
    return new ScanDirs(absolutePath).map(transformFn);
  }
  private _absolutePath: string[];
  constructor(absolutePath: string | string[]) {
    this._absolutePath = Array.isArray(absolutePath)
      ? [...absolutePath]
      : [absolutePath];
    this._parents = [];
    this._cwd = { path: '' };
    this._queue = [...this._absolutePath];
  }
  public get scan() {
    const self = this;
    return function* () {
      while (self._queue.length > 0) {
        const traverse = self._traverse();
        if (traverse) {
          yield* self._scanGenerator()();
        }
      }
      return false;
    };
  }

  public get map() {
    const self = this;
    return async function* (
      transformFn: (path: string) => unknown = (t: string) => t
    ) {
      for await (const path of self.scan()) {
        yield transformFn(path);
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

  private _scanGenerator() {
    const d = opendirSync('.', {});
    const self = this;
    return function* (): Generator<string, boolean, unknown> {
      for (let ent = d.readSync(); ent !== null; ent = d.readSync()) {
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

export default ScanDirs;

export const scanFrom = ScanDirs.scanFrom;
export const from = ScanDirs.from;
