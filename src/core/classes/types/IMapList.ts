import { IUnbox } from '.';
import { IUnboxList } from './IUnboxList';

export interface IMapList<S> extends IUnboxList<S>, IUnbox<S[]> {
  mapList<Q>(fn: (value: S) => Q): IUnboxList<Q>;
}
