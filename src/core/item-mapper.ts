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
import { immediateZalgo } from '../utils';

// ~#----- itemMapper -------------------------------------------------#-~
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
    return promiseFulfilledResult;
  } catch (reason_) {
    const reason = await immediateZalgo(reason_);
    const promiseRejectedResult: PromiseRejectedResult = {
      status: 'rejected',
      reason,
    };
    return promiseRejectedResult;
  }
  // ++----------------------------------------------------------------+
}
// ~#------------------------------------------------------------------#-~
