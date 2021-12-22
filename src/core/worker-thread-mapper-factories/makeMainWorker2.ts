import { WorkerData, Worker_Threads } from '../../types';
import { getAsyncWorker } from './the-main-worker';


export function makeMainWorker2<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
) {
  return <R>(workerData: WorkerData<T>): Promise<R> => worker_threads.isMainThread
    ? getAsyncWorker<R, unknown>(filename, {
      workerData,
      worker_threads,
    })
    : (void null as never as Promise<R>);
}
