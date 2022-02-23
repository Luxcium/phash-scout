import { IQueryListPhash } from '../../core/types/IQueryListPhash';
import { RADIUS, TARGET } from './constants';

export async function readListRx(
  listing: IQueryListPhash,
  path_: string,
  index: any,
  radius_: string = RADIUS
) {
  const queryList = listing.list;
  const step2 = queryList.map(([path, , radius]) => {
    const result = parseInt(radius) === parseInt(radius_) ? path : null;
    if (path_ !== path) {
      if (result) console.log(` mv '${result}' '${TARGET}' #`, index);
      return [result];
    }
    if (result) console.log('#', 'mv', result, TARGET, '#', index);

    return [result];
  });
  const lastStep = step2;
  return lastStep;
}
