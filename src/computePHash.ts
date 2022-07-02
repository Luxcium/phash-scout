import { phashNow } from './phashNow';
import { notExcluded } from './tools';
import {
  Excluded,
  IsExcluded,
  IsNotValidPHash,
  IsValidPHash,
  NotExcluded,
  PathWithStats,
  ValidPHash,
} from './types';
import { immediateZalgo } from './utils';

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
    getPHash: getPHashValue<T>(paths),
  };
  return result;
}

export function getPHashValue<T extends PathWithStats>(
  paths: T
): () => Promise<
  (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
> {
  return async () => {
    if (notExcluded(paths)) {
      const { phash } = phashNow(paths);
      const hash = await phash.get();
      if (typeof hash === 'string') {
        return immediateZalgo({
          pHash: hash,
          exclude: false,
        });
      }
    }
    return immediateZalgo({
      pHash: null,
      exclude: true,
    });
  };
}
