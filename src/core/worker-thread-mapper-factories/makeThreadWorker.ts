import { MakeThreadWorkerArgs, WorkerData } from '../types/types';
import { theThreadWorker } from './the-thread-worker';

export function makeThreadWorker<T, R>({
  threadWorkerFn,
  worker_threads,
}: MakeThreadWorkerArgs<T, R>) {
  const threadWorker_MappingFn = (workerdata: WorkerData<T>): R =>
    threadWorkerFn(workerdata.value, workerdata.index, workerdata.array);
  return () =>
    !worker_threads.isMainThread
      ? theThreadWorker(threadWorker_MappingFn)
      : void null;
}
