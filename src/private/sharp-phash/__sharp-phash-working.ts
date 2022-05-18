import { BoxedGenerator } from '@luxcium/boxed-list';
import { statSync } from 'fs';
import { CURRENT_PATH } from '../../constants/radius';
import {
  notExcluded,
  notNull,
} from '../../packages/file-path/tools/notExclude';
import { immediateZalgo } from '../../utilities/utils';
import { QueryResultItem, QueryResultObject } from '../img-scout/types';
import { uniqueAddToObj } from '../img-scout/uniqueAddToObj';
import { filterExtensions, getPhash } from './getFilesWithPHash';
import { listFiles } from './listFiles';
import { rConnect } from './rConnect';

const humanSize = require('human-size');

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
  const listFiles006 = listFiles(
    '/home/luxcium/Téléchargements/photos-ChatExport_2022-05-18',
    true
  );
  const boxedGenerator2 = getPhash(
    filterExtensions()(
      BoxedGenerator.from<any>(
        listFiles001,
        listFiles002,
        listFiles003,
        listFiles004,
        listFiles005,
        listFiles006
      )
    )
  );
  const R = await rConnect();
  const boxedGenerator3 = boxedGenerator2.map(async i => {
    const waited = await i;
    let getQueryResult = (): any => null;
    let queryResult: null | (QueryResultItem | QueryResultObject)[] = null;
    if (notNull(waited.pHash) && notExcluded(waited)) {
      const { fullPath } = waited;
      const stats = statSync(fullPath);
      const phash_ = waited.pHash;
      const k = 'x001';
      queryResult = await uniqueAddToObj({
        R,
        title: `${k}:${humanSize(stats.size, 2) || 0}:${
          stats.size
        }:${fullPath}`,
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
      try {
        if (notExcluded(waited)) {
          const { queryResult, ...awaited } = waited;
          if (queryResult) {
            const result = {
              queryResult, //: queryResult.reverse(),
              ...awaited,
            };
            const count2 = { a1: 0 };
            result.queryResult.map(
              qrItem =>
                (qrItem as QueryResultObject).radius === '0' &&
                count2.a1++ === 0 &&
                console.log(result)
            );
            // if (result.queryResult) {
            // console.log(result);

            // }
            return result;
          }
        }
      } catch (error) {
        console.error('in boxedGenerator3', error);
      }
      return item;
    })
    .asyncSpark()
    .then(a => {
      R.QUIT();
      return a;
    })
    .catch(error => console.error('in boxedGenerator3', error));

  return result;
}
main();
