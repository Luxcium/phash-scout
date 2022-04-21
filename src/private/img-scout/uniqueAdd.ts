import { immediateZalgo } from '../../core/utils';
import { addPhash } from './addPhash';
import { hasSomeTitleInclude, shiftTitle } from './querryAndAdd';
import { queryPhash } from './queryPhash';
import { isQueryResultList } from './tools';
import type { PQuerryAndAdd, QueryResultItem, RawQueryResult } from './types';

// -5 add as the first and only
// -10 add as the next and more
// -15 already added previously and current
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
    if (hasSomeTitleInclude(title, queryResultList)) {
      let tCount = -15;
      return immediateZalgo(
        queryResultList
          .map(shiftTitle(title, `${tCount--}`))
          .sort((a, b) => Number(a[2]) - Number(b[2]))
      );
    }

    id = await addPhash(R, k, phash_, title);
    queryResultList.unshift([title, id, '-10']);
    return immediateZalgo(queryResultList);
  }
  id = await addPhash(R, k, phash_, title);
  return immediateZalgo([[title, id, '-5']]);
}
