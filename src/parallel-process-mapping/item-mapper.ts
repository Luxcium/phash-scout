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

import { WM } from '../types';
import { immediateZalgo, restrainingZalgo } from '../utils';
/*

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
 */
export async function itemMapper<T, U>(
  currentValue: T,
  index: number,
  array: T[],
  mapper_mainWorker: WM<T, U>
) {
  const value = await immediateZalgo(
    mapper_mainWorker(currentValue, index, array)
  );

  try {
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
