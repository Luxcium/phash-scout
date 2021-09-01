/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { IO_Map, processMap } from './';

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as any;
main();
async function main() {
  const result = processMap(__filename)(values, (x: any) => x * 200, 1);
  result.thread();
  worker_threads.isMainThread ? console.log(await result.mapper()) : void 0;
}

worker_threads.isMainThread ? main2() : void 0;
async function main2() {
  const result = IO_Map(values, (x: number) => x * 45, 10);
  console.log(await result);
}
