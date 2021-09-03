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

import type { Mapper } from '../types';
import { itemMapper } from './item-mapper';

export async function worker<T, U>(
  gen: Generator<[T, number, T[]]>,
  mapFn: Mapper<T, U | Promise<U>>,
  result: PromiseSettledResult<U>[]
) {
  for (let [currentItem, index, array] of gen) {
    result[index] = await itemMapper(mapFn, currentItem, index, array);
  }
}
