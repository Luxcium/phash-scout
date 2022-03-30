import { IUnbox } from './IUnbox';
import { IUnboxList } from './IUnboxList';

/** IMapItems<S> extends IUnboxList<S>, IUnbox<S[]> */
export interface IMapItems<S> extends IUnboxList<S>, IUnbox<S[]> {
  mapItems<Q>(fn: (value: S) => Q): IUnboxList<Q>;
}
