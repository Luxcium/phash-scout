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

import { Mapper } from './types';
import { immediateZalgo, restrainingZalgo } from './utils';

async function mapItem<T, U>(
  mapFn: Mapper<T, U>,
  currentValue: T,
  index: number,
  array: T[]
): Promise<PromiseSettledResult<U>> {
  try {
    const value = await immediateZalgo(mapFn(currentValue, index, array));

    const promiseFulfilledResult: PromiseFulfilledResult<U> = {
      status: 'fulfilled',
      value,
    };
    await restrainingZalgo.immediate();
    return promiseFulfilledResult;
  } catch (reason) {
    const promiseRejectedResult: PromiseRejectedResult = {
      status: 'rejected',
      reason,
    };
    await restrainingZalgo.immediate();
    return promiseRejectedResult;
  }
}

async function worker<T, U>(
  gen: Generator<[T, number, T[]]>,
  mapFn: Mapper<T, U>,
  result: PromiseSettledResult<U>[]
) {
  for (let [currentValue, index, array] of gen) {
    result[index] = await mapItem(mapFn, currentValue, index, array);
  }
}

function* arrayGenerator<T>(array: T[]): Generator<[T, number, T[]]> {
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    yield [currentValue, index, array];
  }
}

async function mapAllSettled<T, U>(
  arr: T[],
  mapFn: Mapper<T, U>,
  limit: number = arr.length
): Promise<PromiseSettledResult<U>[]> {
  const result: PromiseSettledResult<U>[] = [];

  if (arr.length === 0) {
    return result;
  }

  const gen = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);

  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(gen, mapFn, result));
  }

  await Promise.all(workers);
  // const item = await Promise.allSettled(workers);; void item

  return result;
}

async function IO_Mapper<T, U>(
  arr: T[],
  mapFn: Mapper<T, U>,
  limit: number = arr.length
): Promise<PromiseSettledResult<U>[]> {
  return mapAllSettled(arr, mapFn, limit);
}
export { IO_Mapper };
