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

// const { AWAIT_EACH, isOpenDirSYNC, isReadSYNC, isCloseDirSYNC } = flags;

// const count = {
//   a: 0,
//   b: 0,
// };

export class TraverseDirs {
  _cwd: { path: string };
  _parents: string[];
  _queue: string[];

  constructor(private _absolutePath: string) {
    this._parents = [];
    this._cwd = { path: '' };
    this._queue = [this._absolutePath];
  }
  get absolutePath() {
    return this._absolutePath;
  }
  get cwd() {
    return this._cwd;
  }
  get parents() {
    return { list: this._parents, length: this._parents.length };
  }
  get parentsList() {
    return this._parents;
  }
  get parentsLength() {
    return this._parents.length;
  }
  get queue() {
    return { list: this._queue, length: this._queue.length };
  }
  get queueList() {
    return this._queue;
  }
  get queueLength() {
    return this._queue.length;
  }

  get scan() {
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
  // async traverseDirs() {
  //   this._parents = [];
  //   this._cwd = { path: '' };
  //   this._queue = [this._absolutePath];

  //   const self = this;
  //   return async function* () {
  //     while (self._queue.length > 0) {
  //       const traverse = self._traverse();
  //       console.log('traverse is:', traverse);
  //       if (traverse) {
  //         console.log('traverse is true:', traverse);
  //         yield* (await self._scanGenerator())();
  //       }
  //       console.log('traverse is:', traverse);
  //     }
  //     return false;
  //   };
  // }

  // while (this._queue.length > 0) {
  //   const scanStep = this._traverse() && (await this._scanGenerator());
  //   if (scanStep) {
  //     scanStep;
  //   }
  // }
  // return;
  // }

  _traverse() {
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
      console.log('will return false; cwd', this._cwd);
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

  async _scanGenerator() {
    const d = await opendir('.', {});
    const self = this;
    return async function* (): AsyncGenerator<string, boolean, unknown> {
      for (let ent = await d.read(); ent !== null; ent = await d.read()) {
        if (ent.isDirectory()) {
          self._queue.push(ent.name);
        } else {
          const fullPath = normalize(`${self._cwd.path}/${ent.name}`);
          yield fullPath;
          // await self._sideEffects(sideFunction)(fullPath, counts);
        }
      }
      d.close();
      return false;
    };
  }
  // async _scanG(
  //   sideFunction: (args: SideFunctionParam) => Promise<unknown>,

  //   counts: any = null
  // ) {
  //   const d = await opendir('.', {});
  //   /* FOR LOOP */
  //   for (let ent = await d.read(); ent !== null; ent = await d.read()) {
  //     if (ent.isDirectory()) {
  //       this._queue.push(ent.name);
  //     } else {
  //       const fullPath = normalize(`${this._cwd.path}/${ent.name}`);
  //       await this._sideEffects(sideFunction)(fullPath, counts);
  //     }
  //   }
  //   /* FOR LOOP */
  //   d.close();
  // }
  _hasKey<K extends PropertyKey>(
    o: unknown,
    key: K
  ): o is { [P in K]: unknown } {
    return typeof o === 'object' && o !== null && key in o;
  }

  // _sideEffects(sideFunction: (args: SideFunctionParam) => Promise<unknown>) {
  //   return async (fullPath: string, counts: any) => {
  //     try {
  //       counts
  //         ? counts?.await || 0 % (AWAIT_EACH || 1) === 0
  //         : !counts
  //         ? await sideFunction({ fullPath, count })
  //         : sideFunction({ fullPath, count });
  //     } catch (error) {
  //       logError(String(error), 'ERROR');
  //     }
  //   };
  // }
}

async function main() {
  const traverseDirs = new TraverseDirs('/home/luxcium');
  const { scan } = traverseDirs;

  for await (const file of scan()) {
    console.log(file);
  }
}
main();

// const noAWAIT = true;
// isCloseDirSYNC
// ? dir.closeSync()
// : noAWAIT
// ? dir.close();
// : await dir.close();

// const dir = opendirSync('.', {});
// const dir = isOpenDirSYNC ? opendirSync('.', {}) : await opendir('.', {});

// let ent = isReadSYNC ? dir.readSync() : await dir.read();
