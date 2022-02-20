import { isQueryResultItem, QueryResultItem } from './isQueryResultItem';

export type QueryResult = QueryResultItem[];
export function isQueryResult(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}
