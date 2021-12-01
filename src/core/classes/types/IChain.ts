import { IMap } from './IMap';

export interface IChain<T> extends IMap<T> {
  chain<R>(fn: (value: T) => R): R;
}
