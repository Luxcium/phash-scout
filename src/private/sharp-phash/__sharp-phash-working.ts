import { BoxedGenerator } from '@luxcium/boxed-list';
import { statSync } from 'fs';
import { CURRENT_PATH } from '../../constants/radius';
import {
  notExcluded,
  notNull,
} from '../../packages/file-path/tools/notExclude';
import { immediateZalgo } from '../../utilities/utils';
import { uniqueAdd } from '../img-scout/querryAndAdd';
import { QueryResultItem } from '../img-scout/tools/isQueryResultItem';
import { filterExtensions, getPhash } from './getFilesWithPHash';
import { listFiles } from './listFiles';
import { rConnect } from './rConnect';

const humanSize = require('human-size');

export { CURRENT_PATH };
export const validExts = new Set(['.png', '.jpeg', '.jpg', '.webp']);
export const count = { index1: 1 };

export async function main() {
  const listFiles001 = listFiles(CURRENT_PATH, true);
  const listFiles002 = listFiles('/home/luxcium/Téléchargements/animes', true);
  const listFiles003 = listFiles(
    '/home/luxcium/Téléchargements/archives 002',
    true
  );
  const listFiles004 = listFiles(
    '/home/luxcium/Téléchargements/images Archives 001',
    true
  );
  const listFiles005 = listFiles(
    '/home/luxcium/Téléchargements/Random images 800+',
    true
  );
  const boxedGenerator2 = getPhash(
    filterExtensions()(
      BoxedGenerator.from<any>(
        listFiles001,
        listFiles002,
        listFiles003,
        listFiles004,
        listFiles005
        // ...getit('')
      )
    )
  );

  // const getit = (folder: string) => getFilesWithPHash(folder, false).unbox();
  // const boxedGenerator2 = BoxedGenerator
  //   .of

  //   // ...getit('')
  //   ();
  const R = await rConnect();
  const boxedGenerator3 = boxedGenerator2.map(async i => {
    const waited = await i;

    // const { type } = waited;
    // type;
    let getQueryResult = (): any => null;
    let queryResult: null | QueryResultItem[] = null;
    if (
      notNull(waited.pHash) &&
      notExcluded(waited)
      // type === FileType.File
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
