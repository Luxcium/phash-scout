import { isArray } from '../../core/utils';
import { Bg } from '../../private/file-path/types';

export function describeMapping<T>(fn: <R>(val: T) => R) {
  return (mapable: T[] | Bg<T>) => {
    if (isArray(mapable)) {
      return mapable.map(fn);
    }
    return mapable.map(fn);
  };
}
