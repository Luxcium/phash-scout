import { IUnbox } from '.';
import { IUnboxList } from './IUnboxList';

export interface IMapItems<S> extends IUnboxList<S>, IUnbox<S[]> {
  mapItems<Q>(fn: (value: S) => Q): IUnboxList<Q>;
}
