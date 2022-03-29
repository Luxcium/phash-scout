import { WithExclude } from '../../packages/file-path/types';

export async function notExcludeAsync(item: Promise<WithExclude>) {
  return !(await item).exclude;
}
