import { S, TX } from '../../core/types/IQueryListPhash';
import { isQueryResult } from './isQueryResult';

export async function willLog(
  tx: TX,
  log: boolean = false
): Promise<{
  pHash: string;
  fileName: string;
  list: [fullPath: string, id: number, radius: string][];
}> {
  const awaitedTx = await tx;
  const { transact, fileName, phash_, fullPath } = awaitedTx;
  const transact_ = await transact;
  const addResult = await transact_.addResult;
  const rawQueryResult = await transact_.rawQueryResult;
  const pHash = phash_;
  if (addResult != null) {
    const list: [path: S, id: number, radius: S][] = [
      [fullPath, addResult as number, '-2'],
    ];

    const result = { pHash, fileName, list };
    if (log) console.log(result);
    return result;
  }
  if (isQueryResult(rawQueryResult)) {
    rawQueryResult.unshift([fullPath, 0, '-1']);
    const list: [path: S, id: number, radius: S][] = rawQueryResult;
    const result = { pHash, fileName, list };
    if (log) console.log(result);
    return result;
  }
  const list: [path: string, id: number, radius: string][] = [
    [fullPath, 0, 'NaN'],
  ];
  const result = { pHash, fileName, list };
  return result;
}
