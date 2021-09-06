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

import type { MapAllSettledArgs, WorkerArgs } from '../types';
import { arrayGenerator } from './arrayGenerator';
import { worker } from './worker';

export async function mapAllSettled<T, U>({
  list,
  mapFn,
  limit = list.length,
  count,
}: MapAllSettledArgs<T, U> & { count?: { [K: string]: number } }): Promise<
  PromiseSettledResult<U>[]
> {
  const result: PromiseSettledResult<U>[] = [];

  if (list.length === 0) {
    return result;
  }

  const gen = arrayGenerator(list, count);

  limit = Math.min(limit, list.length);

  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    // !! WORKER MUST BE INTANCIATED HERE

    const workerArgs: WorkerArgs<T, U> & { count?: { [K: string]: number } } = {
      gen,
      mapFn,
      result,
      count,
    };
    // SIDE EFFECTS:
    workers.push(worker(workerArgs));
  }

  await Promise.all(workers);

  return result;
}
