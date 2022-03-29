import { stat } from 'fs/promises';
import { immediateZalgo } from '../../core/utils';
import { isA_Promise } from '../../packages/file-path/tools';
import { addPhash } from './addPhash';
import { queryPhash } from './queryPhash';
import {
  isQueryResultList,
  PQuerryAndAdd,
  QueryResultItem,
  RawQueryResult,
} from './tools/isQueryResultItem';

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

export async function uniqueAddToObj(querryAndAddParam: PQuerryAndAdd) {
  const addRes: Promise<QueryResultItem[]> =
    uniqueAdd(querryAndAddParam); /* : Promise<QueryResultItem[]> */
  return toQueryResultObj(addRes);
}
export type QueryResultObj = {
  path: string;
  id: number;
  radius: string;
};

export function toQueryResultObj(queryItem: QueryResultItem): QueryResultObj;
export function toQueryResultObj(
  queryItem: Promise<QueryResultItem[]>
): Promise<QueryResultObj[]>;
export function toQueryResultObj(
  queryItem: QueryResultItem | Promise<QueryResultItem[]>
): QueryResultObj | Promise<QueryResultObj[]> {
  if (isA_Promise(queryItem)) {
    return (async () => {
      const result = (await queryItem)
        .map((x: QueryResultItem): QueryResultObj => toQueryResultObj(x))
        .map(async i => {
          let size = await immediateZalgo(0);
          try {
            ({ size } = await stat(i.path));
          } catch (error) {
            console.error('E R R O R :', error);
          }
          return { ...i, size };
        });
      return Promise.all(result);
    })();
  }
  return {
    path: queryItem[0],
    id: queryItem[1],
    radius: queryItem[2],
  } as QueryResultObj;
}
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
