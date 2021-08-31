/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
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
