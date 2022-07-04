import { PathWithStats, PHashGet } from '../../types';
import { makePHashGetter } from './makePHashGetter';

void function computePHash<T extends PathWithStats>(
  paths: T
): PathWithStats & PHashGet {
  const result: PathWithStats & PHashGet = {
    ...paths,
    await: { ...makePHashGetter<T>(paths).await },
  };
  return result;
};
