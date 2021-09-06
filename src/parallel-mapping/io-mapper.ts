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

import type { IO_MapperArgs, MapAllSettledArgs } from '../types';
import { mapAllSettled } from './map-allSettled';

async function IO_Mapper<T, U>({
  list,
  mapFn,
  limit = list.length,
  count,
}: IO_MapperArgs<T, U> & { count: { [K: string]: number } }): Promise<
  PromiseSettledResult<U>[]
> {
  const mapAllSettledArgs: MapAllSettledArgs<T, U> & {
    count: { [K: string]: number };
  } = { count, list, mapFn, limit };
  return mapAllSettled(mapAllSettledArgs);
}
export { IO_Mapper };
