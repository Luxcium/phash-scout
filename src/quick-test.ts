/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { IO_Mapping, processMapping } from './';

main;
main2();
async function main() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [worker, thread] = processMapping({
    filename: __filename,
    workerThreads: worker_threads,
    list: values,
    limit: 1,
    mappingFn: (x: number) => x + 1,
  });
  thread();
  worker_threads.isMainThread ? console.log(await worker()) : void 0;
}

async function main2() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = IO_Mapping(values, (x: number) => x * 45, 10);
  // const [worker, thread] = processMapping({
  //   filename: __filename,
  //   workerThreads: worker_threads,
  //   list: values,
  //   limit: 1,
  //   mappingFn: (x: number) => x + 1,
  // });
  // thread();
  worker_threads.isMainThread ? console.log(await result) : void 0;
}
