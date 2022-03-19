import { immediateZalgo } from '../../../core/utils';
import {
  isQueryResultList,
  PQuerryAndAdd,
  QueryResultItem,
  RawQueryResult,
} from '../isQueryResultItem';
import { addPhash } from './addPhash';
import { queryPhash } from './queryPhash';

const hasSomeTitleInclude = (title: string, queryResult: QueryResultItem[]) =>
  queryResult.some(i => i[0] === title);

const shiftTitle =
  (title: string, level = '-1') =>
  (i: QueryResultItem) => {
    if (i[0] === title) i[2] = level;

    return i;
  };
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
      return immediateZalgo(queryResultList.map(shiftTitle(title, '-1')));
    }

    id = await addPhash(R, k, phash_, title);
    queryResultList.unshift([title, id, '-2']);
    return immediateZalgo(queryResultList);
  }
  id = await addPhash(R, k, phash_, title);
  return immediateZalgo([[title, id, '-3']]);
}

export const toObj = (queryItem: QueryResultItem) => ({
  path: queryItem[0],
  id: queryItem[1],
  radius: queryItem[2],
});
export const toTup = (queryItem: QueryResultObject) => [
  queryItem.path,
  queryItem.id,
  queryItem.radius,
];

export type QueryResultObject = {
  path: string;
  id: number;
  radius: string;
};
