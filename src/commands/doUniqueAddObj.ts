import { statSync } from 'fs';

import { titleBuilder } from '../tools/titleBuilder';
import { uniqueAddToObj } from '.';

export function doUniqueAddObj(
  R: any,
  key: string,
  {
    fullPath,
    pHash,
    dir,
    baseName,
    extname,
  }: {
    fullPath: string;
    pHash: string;
    dir: string;
    baseName: string;
    extname: string;
  }
) {
  const stats = statSync(fullPath);
  const title = titleBuilder({ dir, baseName, extname, ...stats, key });
  const result = uniqueAddToObj({
    R,
    title,
    phash_: pHash,
    radius: '0',
    k: key,
  });
  return result;
}
