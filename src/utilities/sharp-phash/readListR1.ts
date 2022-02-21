import { IQueryListPhash } from '../../core/types/IQueryListPhash';
import { TARGET } from './constants';

export async function readListR1(
  listing: IQueryListPhash,
  path_: string,
  index: any
) {
  const queryList = listing.list;
  const step2 = queryList.map(([path, , radius]) => {
    const result = parseInt(radius) === 3 ? path : null;
    if (path_ !== path) {
      if (result) console.log('  mv', result, TARGET, '#', index);
      return [result];
    }
    if (result) console.log('#', 'mv', result, TARGET, '#', index);

    return [result];
  });
  const lastStep = step2;
  return lastStep;
}
