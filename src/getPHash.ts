import { computePHash } from './computePHash';
import { Excluded, PathWithStats, ValidPHash } from './file-path/types';
import { Bg } from './file-path/types/Bg';

export function getPhash<T extends PathWithStats>(list: Bg<T>) {
  return getPHash(list);
}

export function getPHash<T extends PathWithStats>(
  list: Bg<T>
): Bg<
  T &
    PathWithStats & {
      pHashValue: () => Promise<
        | (Excluded<false> & ValidPHash<true>)
        | (Excluded<true> & ValidPHash<false>)
      >;
    }
> {
  return list.map(paths => computePHash(paths));
}
