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
export type ThreadMapper<U, R> = (workerData: WorkerData<U>) => R;

export type Mapper = <T, U>(
  value: T,
  index?: number,
  array?: readonly T[]
) => U;

export type WorkerMapper = <R>() => Mapper &
  (<T>(value: T, index?: number, array?: readonly T[]) => Promise<R>);


export type WorkerMapper2 = <T>() =><R>() =>
  ((value: T, index?: number, array?: readonly T[]) => Promise<R>);
