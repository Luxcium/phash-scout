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

import type { ItemMapperArgs, WorkerArgs } from '../types';
import { itemMapper } from './item-mapper';

export async function worker<T, U>({ gen, mapFn, result }: WorkerArgs<T, U>) {
  // !!
  // !! !! WORKER MAPPING SHOULD BE AT THIS LEVEL OF ABSTRACTION !
  // !!

  for (let [currentItem, index, array] of gen) {
    const itemMapperArgs: ItemMapperArgs<T, U> = {
      mapFn,
      currentItem,
      index,
      array,
    };

    // SIDE EFFECTS:
    result[index] = await itemMapper(itemMapperArgs);
  }
}
