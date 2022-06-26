import { BoxedGenerator } from '@luxcium/boxed-list';
import { PathWithStats, WithExclude, WithPHash } from '../file-path/types';
import { Bg } from '../file-path/types/Bg';
import { P } from '../types';
import { oldComputePHash } from './oldComputePHash';

export function oldGetPhash<T extends PathWithStats>(list: Bg<Promise<T>>) {
  return oldGetPHash(list);
}

export function oldGetPHash<T extends PathWithStats>(
  list: BoxedGenerator<Promise<T>>
): Bg<P<T & WithExclude & WithPHash>> {
  return list.map(async paths => oldComputePHash(paths));
}
