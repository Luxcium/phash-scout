import { immediateZalgo } from '../../core/utils';
import { addPhash } from './addPhash';
import { hasSameTitleInclude } from './hasSameTitleInclude';
import { queryPhash } from './queryPhash';
import { shiftTitle } from './shiftTitle';
import { isQueryResultList } from './tools';
import type { PQuerryAndAdd, QueryResultItem, RawQueryResult } from './types';

// -5 add as the first and only
// (not isQueryResultList or length === 0 )

// -10 add as the next and more
// (has Not SomeTitleInclude but is queryResultList & length > 0 )

// -15 already added previously
// (has SomeTitleInclude so it was previously -10 or -5)
export async function uniqueAdd(
  querryAndAddParam: PQuerryAndAdd
): Promise<QueryResultItem[]> {
  const { R, k, phash_, title, radius } = querryAndAddParam;

  const rawQueryResult: RawQueryResult = queryPhash(
    R,
    k,
    phash_,
    radius || '0'
  );
  const queryResultList = await rawQueryResult;

  let id = 0;
  if (isQueryResultList(queryResultList) && queryResultList.length > 0) {
    if (hasSameTitleInclude(title, queryResultList)) {
      let tCount = -15;

      //++ already added previously will be lower than -15 -----------
      return immediateZalgo(
        queryResultList
          .map(shiftTitle(title, `${tCount--}`))
          .sort((a, b) => Number(a[2]) - Number(b[2]))
      );
    }

    id = await addPhash(R, k, phash_, title);
    //++ add as the the next and more as -10 -------------------------
    queryResultList.unshift([title, id, '-10']);
    return immediateZalgo(queryResultList);
  }

  id = await addPhash(R, k, phash_, title);
  //++ add as the first and only as -5 -------------------------------
  return immediateZalgo([[title, id, '-5']]);
}