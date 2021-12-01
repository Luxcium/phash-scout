import { IMap } from './IMap';
import { IUnbox } from './IUnbox';

export interface IApply<T> extends IMap<T> {
  ap<R>(c: IMap<(val: T) => R>): IApply<R> & IUnbox<R> & IMap<R>;
}
