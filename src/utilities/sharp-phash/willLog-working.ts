import { CurrentPath } from '../../core/types';
import { S, TX } from '../../core/types/IQueryListPhash';
import { isQueryResult } from './isQueryResult';

export async function willLog(
  tx: TX,
  log: boolean = false
): Promise<{
  pHash: {
    willPhash_: () => Promise<string | null>;
    index: number;
    value: string | null;
  };
  path: CurrentPath;
  list: [fullPath: string, id: number, radius: string][];
}> {
  const awaitedTx = await tx;
  const { transact, path, pHash } = awaitedTx;
  const transact_ = await transact;

  const addResult = (await transact_?.addResult) || null;
  const rawQueryResult = (await transact_?.rawQueryResult) || null;
  if (addResult != null) {
    const list: [path: S, id: number, radius: S][] = [
      [path.fullPath, addResult as number, '-2'],
    ];

    const result = { pHash, path, list };
    if (log) console.log(result);
    return result;
  }
  if (isQueryResult(rawQueryResult)) {
    rawQueryResult.unshift([path.fullPath, 0, '-1']);
    const list: [path: S, id: number, radius: S][] = rawQueryResult;
    const result = { pHash, path, list };
    if (log) console.log(result);
    return result;
  }
  const list: [path: string, id: number, radius: string][] = [
    [path.fullPath, 0, 'NaN'],
  ];
  const result = { pHash, path, list };
  return result;
}

/*

function(hash: {
    path: CurrentPath;
    phash: PhashNow;
}): Promise<{
    transact: Promise<null>;
    path: CurrentPath;
    pHash: {
        willPhash_: () => Promise<string | null>;
        index: number;
        value: null;
    };
} | {
    transact: P<...>;
    path: CurrentPath;
    pHash: {
        ...;
    };
}>


 Promise<{
      pHash: {
        willPhash_: () => Promise<string | null>;
        index: number;
        value: string;
      };
      path: CurrentPath;
      list: [fullPath: string, id: number, radius: string][];
    }>
 */
