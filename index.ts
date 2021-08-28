/*------------------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *----------------------------------------------------------------------------*/

type Mapper = <T, U>(value: T, index: number, array: readonly T[]) => U;

import { promisify } from 'util';

const setImmediateP = promisify(setImmediate);

async function mapItem<T>(
  mapFn: Mapper,
  currentValue: T,
  index: number,
  array: T[]
) {
  try {
    await setImmediateP();
    return {
      status: 'fulfilled',
      value: await mapFn(currentValue, index, array),
    };
  } catch (reason) {
    return {
      status: 'rejected',
      reason,
    };
  }
}

async function worker<T>(
  gen: Generator<[T, number, T[]]>,
  mapFn: Mapper,
  result: any
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
  mapFn: Mapper,
  limit: number = arr.length
): Promise<U[]> {
  const result: U[] = [];

  if (arr.length === 0) {
    return result;
  }

  const gen /* :[T,number,T[]] */ = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);

  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(gen, mapFn, result));
  }

  await Promise.all(workers);

  return result;
}

async function parallelMapping<T, U>(
  arr: T[],
  mapFn: Mapper,
  limit: number = arr.length
): Promise<U[]> {
  return mapAllSettled(arr, mapFn, limit);
}
export default parallelMapping;
