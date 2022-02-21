import { S, TX } from './IQueryListPhash';
import { isQueryResult } from './isQueryResult';

export async function willLog(
  tx: TX,
  log: boolean = false
): Promise<{
  pHash: string;
  name: string;
  list: [path: string, id: number, radius: string][];
}> {
  const awaitedTx = await tx;
  const { transact, name, phash_, path } = awaitedTx;
  const transact_ = await transact;
  const addResult = await transact_.addResult;
  const rawQueryResult = await transact_.rawQueryResult;
  const pHash = phash_;
  if (addResult != null) {
    const list: [path: S, id: number, radius: S][] = [
      [path, addResult as number, '-2'],
    ];

    const result = { pHash, name, list };
    if (log) console.log(result);
    return result;
  }
  if (isQueryResult(rawQueryResult)) {
    rawQueryResult.unshift([path, 0, '-1']);
    const list: [path: S, id: number, radius: S][] = rawQueryResult;
    const result = { pHash, name, list };
    if (log) console.log(result);
    return result;
  }
  const list: [path: string, id: number, radius: string][] = [[path, 0, 'NaN']];
  const result = { pHash, name, list };
  return result;
}
