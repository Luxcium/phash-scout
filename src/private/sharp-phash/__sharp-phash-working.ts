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

export const CSI = (Pt: string) => `\u009B${Pt}`;

export const CUD = (Ps: number) => CSI(`${Ps}B`);
export const CUU = (Ps: number) => CSI(`${Ps}A`);
export const SM = (Ps: number) => CSI(`${Ps}h`);
/** **Erase In Display:** Erase various parts of the viewport. */
export const ED = (Ps: number) => CSI(`${Ps}J`);
/**  **Erase In Display:** `0` Erase from the cursor through the end of the viewport. */
export const ED0 = ED(0);
/**  **Erase In Display:** `1` Erase from the beginning of the viewport through the cursor. */
export const ED1 = ED(1);
/**  **Erase In Display:** `2` Erase complete viewport. */
export const ED2 = ED(2);
/**  **Erase In Display:** `3` Erase scrollback. */
export const ED3 = ED(3);

/** 2	Keyboard Action Mode (KAM). Always on.	✗ */
export const SM2 = SM(2);
/** 4	Insert Mode (IRM).	✓ */
export const SM4 = SM(4);
/** 12	Send/receive (SRM). Always off.	✗ */
export const SM12 = SM(12);
/** 20	Automatic Newline (LNM). Always off.	✗ */
export const SM20 = SM(20);
export const RM = (Ps: number) => CSI(`${Ps}l`);
/**2	Keyboard Action Mode (KAM). Always on.	✗   */
export const RM2 = RM(2);
/** 4	Replace Mode (IRM). (default)	✓   */
export const RM4 = RM(4);
/** 12	Send/receive (SRM). Always off.	✗   */
export const RM12 = RM(12);
/** 20	Normal Linefeed (LNM). Always off.	✗   */
export const RM20 = RM(20);
export const DECSET = (Ps: string) => CSI(`?${Ps}h`);
export const DECRST = (Ps: string) => CSI(`?${Ps}l`);

process.title = 'Sharp pHash';
//+ cliCursor hide
console.error('cliCursor hide [?25l]');
process.stderr.write('\u009B?25l');
//+ Use Alternate Screen Buffer.
console.error(
  'Save cursor and switch to alternate buffer clearing it. [?1049h]'
);
console.error('\u009B?1049h');

process.on('SIGINT', () => {
  process.exitCode = 2; //+ 128;
  throw new Error();
});

process.on('SIGTERM', () => {
  process.exitCode = 15; //+ 128;
  throw new Error();
});
process.on('beforeExit', code => {
  console.error('\u009B!p');
  console.error('\u001Bc');
  //+ Use Normal Screen Buffer (clearing screen if in alt).
  console.error('Use Normal Screen Buffer [?1049l]');
  console.error('\u009B?1049l');
  console.error(code - 128);
  console.error('Use Normal Screen Buffer and restore cursor. [?1049l]');
  //+ cliCursor show
  console.error('cliCursor show [?25h]');
  console.error('\u009B?25h');
  console.error(`About to exit with code: ${code - 128}`);
});

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
                // console.error();
                console.log(ED2, CUD(10_000), result.queryResult)
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
