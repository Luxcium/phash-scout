import { makePhashCacheKey } from './makePhashCacheKey';

export async function pHashLookUp(
  R: any,
  pathStr: string
): Promise<string | false> {
  const K = makePhashCacheKey(pathStr);
  return R.GET(K).then((lookUP: any) =>
    lookUP !== null ? `${lookUP}` : false
  );
}
