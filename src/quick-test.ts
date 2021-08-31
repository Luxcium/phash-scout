import * as worker_threads from 'worker_threads';
import parallelMapping from './parallel-mapping';

main();
async function main() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [worker, thread] = parallelMapping({
    filename: __filename,
    workerThreads: worker_threads,
    list: values,
    limit: 1,
    mappingFn: (x: number) => x + 1,
  });
  thread();
  worker_threads.isMainThread ? console.log(await worker()) : void 0;
}
