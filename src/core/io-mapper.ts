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

export async function IO_Mapper<T, U>({
  list,
  mapFn,
  limit = list.length,
}: IO_MapperArgs<T, U>): Promise<PromiseSettledResult<U>[]> {
  // ++----- IO_Mapper ------------------------------------------------+
  //
  const mapAllSettledArgs: MapAllSettledArgs<T, U> = { list, mapFn, limit };
  return mapAllSettled(mapAllSettledArgs);
  //
  // ++----------------------------------------------------------------+
}
