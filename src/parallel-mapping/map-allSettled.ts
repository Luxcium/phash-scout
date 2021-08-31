/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
import { WM, WT } from '../types';
import { arrayGenerator } from './arrayGenerator';
import { worker } from './worker';

export async function mapAllSettled<T, U>(
  arr: T[],
  // mapFn: Mapper<T,U>,
  limit: number = arr.length,
  mainWorker: WT
): Promise<U[]> {
  const result: U[] = [];

  if (arr.length === 0) {
    return result;
  }
  const gen = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);
  const mainWorker_mapper: WM<T, U> = mainWorker<T>()<U>();
  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(gen, result, mainWorker_mapper));
  }

  await Promise.all(workers);

  return result;
}
