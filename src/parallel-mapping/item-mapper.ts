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
import { immediateZalgo, restrainingZalgo, timeoutZalgo } from '../utils';

export async function itemMapper<T, U>({
  mapFn,
  currentItem,
  index,
  array,
  count,
}: ItemMapperArgs<T, U> & {
  count?: { [K: string]: number };
}): Promise<PromiseSettledResult<U>> {
  try {
    let tz = immediateZalgo;

    if (count) {
      // #region HACK:                                                 !
      // HACK:→  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  !
      //
      let delay = 1000;
      if (count) delay = count.delay;
      tz = (value: any) => timeoutZalgo(delay, value);
      //
      // & →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  →  !
      // #endregion                                                    !
    }

    const value = await tz(mapFn(currentItem, index, array));
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
// const tz = (value: any) => timeoutZalgo(5000, value);
//
