/*
MIT License

Copyright (c) webstrand 2022

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { opendirSync } from 'node:fs';
import { constants } from 'node:os';
import { chdir, exit } from 'node:process';

doTraverseDirs(process.argv[2]);
exit(0);

function doTraverseDirs(dir: string) {
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
      if (ent.isDirectory()) queue.push(ent.name);
      else console.log(`${cwd}/${ent.name}`);
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
            console.error('skipping', next, error);
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
      console.log(cwd);
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
