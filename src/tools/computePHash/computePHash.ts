import { Excluded, PathWithStats, ValidPHash } from '../../types';
import { makePHashGetter } from './makePHashGetter';

export function computePHash<T extends PathWithStats>(paths: T) {
  const result: PathWithStats & {
    getPHash: () => Promise<
      (
        | (Excluded<false> & ValidPHash<true>)
        | (Excluded<true> & ValidPHash<false>)
      ) &
        (Excluded<boolean> & ValidPHash<boolean>)
    >;
  } = {
    ...paths,
    getPHash: makePHashGetter<T>(paths),
  };
  return result;
}
