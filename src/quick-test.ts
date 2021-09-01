/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { processMapping } from './parallel-process-mapping';

main();
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
