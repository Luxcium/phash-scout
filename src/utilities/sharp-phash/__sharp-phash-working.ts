import { statSync } from 'fs';
import { CURRENT_PATH } from '../../constants/radius';
import { BoxedGenerator } from '../../core';
import { FileType } from '../../core/types';
import { immediateZalgo } from '../utils';
import { uniqueAdd } from './img-scout/querryAndAdd';
import { QueryResultItem } from './isQueryResultItem';
import { getFilesWithPHash } from './listFiles';
import { notExcluded, notNull } from './notExclude';
import { rConnect } from './rConnect';

const humanSize = require('human-size');

export { CURRENT_PATH };
export const validExts = new Set(['.png', '.jpeg', '.jpg', '.webp']);
export const count = { index1: 1 };

export async function main() {
  const listFiles001 = getFilesWithPHash(CURRENT_PATH, true, validExts);
  const listFiles002 = getFilesWithPHash(
    '/home/luxcium/Téléchargements/animes',
    true,
    validExts
  );
  const listFiles003 = getFilesWithPHash(
    '/home/luxcium/Téléchargements/archives 002',
    true,
    validExts
  );
  const listFiles004 = getFilesWithPHash(
    '/home/luxcium/Téléchargements/images Archives 001',
    true,
    validExts
  );
  const listFiles005 = getFilesWithPHash(
    '/home/luxcium/Téléchargements/Random images 800+',
    true,
    validExts
  );

  const getit = (folder: string) => getFilesWithPHash(folder, true).unbox();
  const boxedGenerator2 = BoxedGenerator.of(
    ...listFiles001.unbox(),
    ...listFiles002.unbox(),
    ...listFiles003.unbox(),
    ...listFiles004.unbox(),
    ...listFiles005.unbox(),
    ...getit('')
  );
  const R = await rConnect();
  const boxedGenerator3 = boxedGenerator2.map(async i => {
    const waited = await i;

    const { type } = waited;
    let getQueryResult = (): any => null;
    let queryResult: null | QueryResultItem[] = null;
    if (
      notNull(waited.pHash) &&
      notExcluded(waited) &&
      type === FileType.File
    ) {
      const { fullPath } = waited;
      const stats = statSync(fullPath);
      const phash_ = waited.pHash;
      const k = 'x001';
      queryResult = await uniqueAdd({
        R,
        title: `${k}:${humanSize(stats.size, 2) || 0}:${
          stats.size
        }:${fullPath}`, // waited.fullPath,
        phash_,
        k,
      });
      getQueryResult = () => queryResult;
    }

    return immediateZalgo({ queryResult, ...(await i), getQueryResult });
  });
  const result = boxedGenerator3
    .map(async item => {
      const waited = await item;

      if (notExcluded(waited)) {
        const { queryResult, ...awaited } = waited;
        if (queryResult) {
          const result = {
            queryResult: queryResult.reverse(),
            ...awaited,
          };
          console.log(result);
          return result;
        }
      }
      return item;
    })

    .asyncSpark()
    .then(a => {
      R.QUIT();
      return a;
    });

  return result;
}
main();

/*



 */
