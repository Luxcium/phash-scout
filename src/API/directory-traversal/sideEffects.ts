import { Mapper } from '@types';

import { AWAIT_EACH, logError } from '../../constants';

const count = {
  a: 0,
  b: 0,
};
export default sideMapperAwaitCounts;
export function sideMapperAwaitCounts<U = unknown>(
  sideFunctionMapper: Mapper<string, Promise<U>>, // (args: SideFunctionParam) => Promise<unknown>
  counts: { await: number } | null = null
) {
  const result: Mapper<string, Promise<U>> = async (
    fullPath: string
  ): Promise<U> => {
    try {
      const awaits = counts
        ? (counts?.await || 0) % (AWAIT_EACH || 1) === 0
        : !counts;
      const returnValue = awaits
        ? await sideFunctionMapper(fullPath, count.a++)
        : sideFunctionMapper(fullPath, count.b++);
      return returnValue;
    } catch (error) {
      logError(String(error), 'ERROR');
      throw error;
    }
  };
  return result;
}
