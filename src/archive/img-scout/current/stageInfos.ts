import { readdir } from 'fs/promises';
import { Dirent } from 'fs';

import { getPathsObj } from './getPathsObj';
import { LongShortPath } from './LongShortPath';

export async function stageInfos(
  folderPath: string,
  name: string
): Promise<[user: LongShortPath, collections: Dirent[]]> {
  const parent = getPathsObj(folderPath, name);
  const child = await readdir(parent.path, {
    withFileTypes: true,
  });
  return [parent, child];
}
