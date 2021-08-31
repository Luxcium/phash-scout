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
import { restrainingZalgo } from '../utils';

export async function itemMapper<T>(
  currentValue: T,
  index: number,
  array: T[],
  mapper_mainWorker: WM<T, unknown>
) {
  await restrainingZalgo();

  try {
    return {
      status: 'fulfilled',
      value: await mapper_mainWorker(currentValue, index, array),
    };
  } catch (reason) {
    return {
      status: 'rejected',
      reason,
    };
  }
}
