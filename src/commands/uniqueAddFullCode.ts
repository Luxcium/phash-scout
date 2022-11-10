import type { QueryResultItem, RawQueryResult, S } from '@types';

// import { RADIUS } from '../constants/radius';
import { IMGSCOUT, immediateZalgo, isQueryResultItem } from '../tools';
import { pHsCardKey, phSetKey, phTitleKey } from '../tools/redis/keys';
// import { hasSameTitleInclude } from '../tools/hasSameTitleInclude';
// import { shiftTitle } from '../tools/shiftTitle';
// import { zaddPhash } from './addPhash';
// import { addPhash } from './addPhash';
// import { syncPhash } from './syncPhash';
// import { queryPhash } from './queryPhash';

const VERBOSA3 = false;
const RADIUS = '0';

// -5 add as the first and only
// (not isQueryResultList === TRUE OR length === 0 )

// -10 add as the next and more
// (has NOT SomeTitleInclude but is queryResultList === TRUE AND length > 0 )

// -15 already added previously
// (has SomeTitleInclude === TRUE so it was previously -10 OR -5)

const _keys: any = { list: {} };

const keys: any = (k: string) => {
  const tempValue = _keys.list[k] || 0;
  _keys.list[k] = 1;
  return tempValue;
};

type PQuerryAndAdd = {
  R: any;
  k: S;
  phash_: S;
  title: S;
  radius?: string;
};

export async function uniqueAdd(
  querryAndAddParam: PQuerryAndAdd
): Promise<QueryResultItem[]> {
  const { R, k, phash_, title, radius } = querryAndAddParam;

  const rawQueryResult: RawQueryResult = queryPhash(
    R,
    k,
    phash_,
    radius || '0',
    true,
    keys
  );
  const queryResultList = await rawQueryResult;

  let id = 0;
  if (queryResultList.length > 0 && isQueryResultList(queryResultList)) {
    if (hasSameTitleInclude(title, queryResultList)) {
      let tCount = -15;
      // ++ already added previously will be lower than -15 ----------
      return queryResultList
        .map(shiftTitle(title, `${tCount--}`))
        .sort((a, b) => Number(a[2]) - Number(b[2]));
    }

    id = await addPhash(R, k, phash_, title);
    // ++ add as the the next and more as -10 ------------------------
    queryResultList.unshift([title, id, '-10']);
    return queryResultList;
  }

  id = await addPhash(R, k, phash_, title);
  // ++ add as the first and only as -5 ------------------------------
  return [[title, id, '-5']];
}

export async function queryPhash(
  R: any,
  k: S,
  phash_: S,
  radius: string = RADIUS,
  failSilently = true,
  keys: any
) {
  const keys_ = keys(k);
  try {
    const R_EXISTS = await immediateZalgo(keys_ || R.EXISTS(k));
    if (R_EXISTS === 1) {
      await syncPhash(R, k);
      // SEND COMMAND: IMGSCOUT.QUERY --------------------------------
      const result = R.sendCommand([IMGSCOUT.QUERY, k, phash_, radius]);
      return result;
    }
    console.error(`R.EXISTS(${k}) -> ${R_EXISTS} ... keys.list[k]:${keys_}`);
  } catch (error: any) {
    if (!failSilently) throw new Error('at: queryPhash →' + error);
    console.error('\u009B31mqueryPhash Failled silently\u009B0m');
  }
  return [];
}

export async function syncPhash(R: any, k: string) {
  try {
    // SEND COMMAND: IMGSCOUT.SYNC -----------------------------------
    await R.sendCommand([IMGSCOUT.SYNC, k]);
    return true;
  } catch (error) {
    console.error(String(error));
  }
  return false;
}

export async function addPhash(
  redis: any,
  key: string,
  pHash: string,
  title: string
): Promise<number> {
  const result = await Promise.all([
    // HACK: remove hardcoded name:
    // SEND COMMAND: 'SADD' ------------------------------------------
    redis.sendCommand(['SADD', `${phSetKey(pHash)}`, title]),
    // SEND COMMAND: 'SCARD' -----------------------------------------
    redis.sendCommand(['SCARD', `${phSetKey(pHash)}`]),
    // SEND COMMAND: IMGSCOUT.ADD ------------------------------------
    redis.sendCommand([IMGSCOUT.ADD, key, pHash, title]),
  ]);

  // HACK: remove hardcoded name:
  const awaiter = [
    // SEND COMMAND: 'SET' -------------------------------------------
    redis.sendCommand(['SET', `${phTitleKey(title)}`, String(result[2])]),
  ];

  const cardinality = result[1];
  if (Number(cardinality) > 1) {
    await zaddPhash(cardinality, pHash, redis);
    VERBOSA3 && console.log('SCARD', cardinality, pHash);
  }
  await Promise.all(awaiter);

  return result[2];
}

export async function zaddPhash(cardinality: any, pHash: string, redis: any) {
  const ZADD = 'ZADD';
  // HACK: remove hardcoded name:
  const KEY = pHsCardKey();
  const SCORE = String(Number(cardinality) || -1);
  const MEMBER = phSetKey(pHash);
  // SEND COMMAND: ZADD ----------------------------------------------
  return redis.sendCommand([ZADD, KEY, SCORE, MEMBER]);
}

export function shiftTitle(title: string, level = '-1500') {
  return (i: QueryResultItem) => {
    if (i[0] === title) {
      i[2] = level;
    }

    return i;
  };
}

export function hasSameTitleInclude(
  title: string,
  queryResult: QueryResultItem[]
) {
  return queryResult.some(i => i[0] === title);
}

export function isQueryResultList(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}
