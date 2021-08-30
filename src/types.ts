import type { MessagePort, Worker } from 'worker_threads';

/** Partial interface for `worker_threads` module */
export interface Worker_Threads<W> {
  isMainThread: boolean;
  parentPort: MessagePort | null;
  Worker: typeof Worker;
  workerData: W;
}
export type WorkerData<V> = { value: V; index: number; array: readonly V[] };
export type WorkerMapper_<U, R> = (workerData: WorkerData<U>) => R;

export type Mapper<T,R> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => R;


export type ThreadMapper<T, R> = ((workerData: WorkerData<T>) => R);

// export type WorkerMapper = <R>() => Mapper<TVal> &
//   (<T>(value: T, index?: number, array?: readonly T[]) => Promise<R>);


export type WorkerMapper = <TVal>() =><R>() => /* Mapper<TVal,R> & */
  ((value: TVal, index?: number, array?: readonly TVal[]) => Promise<R>);