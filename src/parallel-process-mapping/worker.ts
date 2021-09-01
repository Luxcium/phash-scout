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
import { itemMapper } from './item-mapper';

export async function worker<T>(
  gen: Generator<[T, number, T[]]>,
  result: any,
  mapper_mainWorker: WM<T, unknown>
) {
  for (let [currentItem, index, array] of gen) {
    result[index] = await itemMapper(
      currentItem,
      index,
      array,
      mapper_mainWorker
    );
  }
}
