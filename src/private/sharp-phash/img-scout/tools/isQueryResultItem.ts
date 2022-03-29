import type { S } from '../../../../core/types/IQueryListPhash';

export type QueryResultItem = [path: string, id: number, radius: string];
export type RawQueryResult = Promise<QueryResultItem[]>;
export type PQuerryAndAdd = {
  R: any;
  k: S;
  phash_: S;
  title: S;
  radius?: string;
};
export function isQueryResultItem(item: unknown): item is QueryResultItem {
  return (
    Array.isArray(item) &&
    item.length === 3 &&
    typeof item[0] === 'string' &&
    typeof item[1] === 'number' &&
    typeof item[2] === 'string'
  );
}

export type QueryResult = QueryResultItem[];
export function isQueryResultList(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}
