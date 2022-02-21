/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { TimerOptions } from 'timers';
import { promisify } from 'util';

export function immediateZalgo<T = void>(
  value?: T | undefined,
  options?: TimerOptions | undefined
): Promise<T> {
  return promisify(setImmediate)(value, options);
}
