import {
  ThreadMapper,
  WorkerData,
  WorkerMapper,
  Worker_Threads,
} from '../types';
import { theMainWorker } from './the-main-worker';
import { theThreadWorker } from './the-thread-worker';
export function workerFactory(filename: string) {
  return <A, B>(threadWork: ThreadMapper<A, B>) =>
    <T>(worker_threads: Worker_Threads<WorkerData<T>>) => {
      const { isMainThread /* , parentPort, Worker, workerData  */ } =
        worker_threads;
      const w_theMainWorkerMapperFunction =
        <Tb>() =>
        <R>() =>
        (value: Tb, index?: number, array?: readonly Tb[]): Promise<R> =>
          isMainThread
            ? theMainWorker<R>(filename, {
                workerData: { value, index, array },
              })
            : (void null as never as Promise<R>); // theMainWorker<R>(script: any, payload: any): Promise<R>
      const t_theThreadWorkerFunction = () =>
        !isMainThread ? theThreadWorker(threadWork) : void null;

      let returnValues: [
        WorkerMapper /* <R>(values: T[]) => Promise<R>[] */,
        () => void
      ];
      returnValues = [w_theMainWorkerMapperFunction, t_theThreadWorkerFunction];
      return returnValues; //  [w_theMainWorkerMapperFunction, t_theThreadWorkerFunction];
    };
}
//
// <R>(values: T[]) => values.map<Promise<R>>(w_theMainWorkerMapperFunction<R>()),
//
//  <R>(values: T[]) =>
// values.map<Promise<R>>(
