import { phashNow } from './phashNow';
import { notExcluded } from './tools/notExclude';
import { Excluded, PathWithStats, ValidPHash } from './types';
import { immediateZalgo } from './utils/utils';

export function computePHash<T extends PathWithStats>(paths: T) {
  const result: PathWithStats & {
    pHashValue: () => Promise<
      | (Excluded<false> & ValidPHash<true>)
      | (Excluded<true> & ValidPHash<false>)
    >;
  } = {
    ...paths,
    pHashValue: async () => {
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
    },
  };
  return result;
}
