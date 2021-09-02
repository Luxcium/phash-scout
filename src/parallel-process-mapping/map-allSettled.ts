/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
/*  Based on work from @userpixel (https://github.com/userpixel)      */
/*  Copyright (c) 2020-2021 Alex Ewerlöf                              */
/*--------------------------------------------------------------------*/

import { WM, WT } from '../types';
import { arrayGenerator } from './arrayGenerator';
import { worker } from './worker';

export async function mapAllSettled<T, U>(
  arr: T[],
  // mapFn: Mapper<T,U>,
  limit: number = arr.length,
  mainWorker: WT
): Promise<PromiseSettledResult<U>[]> {
  const result: PromiseSettledResult<U>[] = [];

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
