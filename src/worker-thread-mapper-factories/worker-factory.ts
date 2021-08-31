import {
  Mapper,
  ThreadMapper,
  WorkerData,
  WorkerMapper,
  Worker_Threads,
  WT_D,
} from '../types';
import { theMainWorker } from './the-main-worker';
import { theThreadWorker } from './the-thread-worker';
export function workerFactory(filename: string) {
  return <A, B>(threadWork: ThreadMapper<A, B>) =>
    <T>(worker_threads: Worker_Threads<WorkerData<T>>) => {
      const { isMainThread } = worker_threads;
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

      let returnValues: [WorkerMapper, () => void];
      returnValues = [w_theMainWorkerMapperFunction, t_theThreadWorkerFunction];
      return returnValues;
    };
}

export function workerFactory_<T, R>(
  filename: string,
  mappingFn: Mapper<T, R>,
  worker_threads: WT_D<T>
): [() => WorkerMapper, () => () => void] {
  const mainWorker = () => makeMainWorker<T>(filename, worker_threads);
  const threadWorker = () => makeThreadWorker<T, R>(mappingFn, worker_threads);

  let intermediateItems: [() => WorkerMapper, () => () => void];

  intermediateItems = [mainWorker, threadWorker];
  return intermediateItems;
}

export const workerFactory_fmw =
  (filename: string) =>
  <T, R>(mappingFn: Mapper<T, R>) =>
  (worker_threads: WT_D<T>) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const workerFactory_fwm =
  (filename: string) =>
  <T>(worker_threads: WT_D<T>) =>
  <R>(mappingFn: Mapper<T, R>) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const workerFactory_mwf =
  <T, R>(mappingFn: Mapper<T, R>) =>
  (worker_threads: WT_D<T>) =>
  (filename: string) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const workerFactory_wmf =
  <T>(worker_threads: WT_D<T>) =>
  <R>(mappingFn: Mapper<T, R>) =>
  (filename: string) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const workerFactory_wfm =
  <T>(worker_threads: WT_D<T>) =>
  (filename: string) =>
  <R>(mappingFn: Mapper<T, R>) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const workerFactory_mfw =
  <T, R>(mappingFn: Mapper<T, R>) =>
  (filename: string) =>
  (worker_threads: WT_D<T>) =>
    workerFactory_(filename, mappingFn, worker_threads);
export const wf = {
  /** fmw: filename: string, mappingFn: Mapper<T, R>, worker_threads: wt<T> */
  fmw: workerFactory_fmw,
  /** fwm: filename: string, worker_threads: wt<T>, mappingFn: Mapper<T, R> */
  fwm: workerFactory_fwm,
  /** mwf: mappingFn: Mapper<T, R>, worker_threads: wt<T>, filename: string */
  mwf: workerFactory_mwf,
  /** wmf: worker_threads: wt<T>, mappingFn: Mapper<T, R>, filename: string */
  wmf: workerFactory_wmf,
  /** wfm: worker_threads: wt<T>, filename: string, mappingFn: Mapper<T, R> */
  wfm: workerFactory_wfm,
  /** mfw: mappingFn: Mapper<T, R>, filename: string, worker_threads: wt<T> */
  mfw: workerFactory_mfw,
  /** fmw: filename: string, mappingFn: Mapper<T, R>, worker_threads: wt<T> */
  workerFactory_,
};

function makeMainWorker<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
) {
  return <Tb>() =>
    <R>() =>
    (value: Tb, index?: number, array?: readonly Tb[]): Promise<R> =>
      worker_threads.isMainThread
        ? theMainWorker<R>(filename, {
            workerData: { value, index, array },
            worker_threads,
          })
        : (void null as never as Promise<R>);
}

function makeThreadWorker<T, R>(
  mappingFn: Mapper<T, R>,
  worker_threads: Worker_Threads<WorkerData<T>>
) {
  const threadWorker_MappingFn = (workerdata: WorkerData<T>): R =>
    mappingFn(workerdata.value, workerdata.index, workerdata.array);
  return () =>
    !worker_threads.isMainThread
      ? theThreadWorker(threadWorker_MappingFn)
      : void null;
}
