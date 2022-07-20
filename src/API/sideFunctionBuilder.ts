import { getBigStrPHashFromFile } from '../tools';
import { SideFunctionParam } from '../types';
import { averageReducer } from './averageReducer';
import { cachedPhash } from './cachedPhash';

export function sideFunctionBuilder(RC: any, times: number[]) {
  return ({ fullPath, count, debug }: SideFunctionParam) => {
    debug &&
      process.stdout.write(
        `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${averageReducer(
          times
        ).toFixed(2)} > \u009B37m${fullPath}\u009B0m\n`
      );
    return cachedPhash(RC, fullPath, getBigStrPHashFromFile);
  };
}
