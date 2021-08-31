/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { promisify } from 'util';

/**
 * @see https://blog.izs.me/2013/08/designing-apis-for-asynchrony
 */
export const restrainingZalgo = () => promisify(setImmediate)();
