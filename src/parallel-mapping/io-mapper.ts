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
import { mapAllSettled } from './map-allSettled';

async function IO_Mapper<T, U>(
  arr: T[],
  mapFn: Mapper<T, U>,
  limit: number = arr.length
): Promise<PromiseSettledResult<U>[]> {
  return mapAllSettled(arr, mapFn, limit);
}
export { IO_Mapper };
