/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
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
