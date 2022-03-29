import { WithExclude } from '../../packages/file-path/types';
import { notExcluded } from './notExclude';

export function notExcludeList(list: WithExclude[]) {
  return list.filter(notExcluded);
}
