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

import type { ItemMapperArgs } from '../types';
import { immediateZalgo, restrainingZalgo } from '../utils';

export async function itemMapper<T, U>({
  mapFn,
  currentItem,
  index,
  array,
}: ItemMapperArgs<T, U>): Promise<PromiseSettledResult<U>> {
  // ++----- itemMapper -----------------------------------------------+

  try {
    const value = await immediateZalgo(mapFn(currentItem, index, array));
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
  // ++----------------------------------------------------------------+
}
