import { QueryResultItem, QueryResultObject } from './types';
import { SplitPath } from './types/SplitPath';
import { getSplit } from './utils';

export function toSizedObj(
  queryItem: QueryResultItem
): SplitPath & QueryResultObject {
  return {
    ...getSplit(queryItem[0]),
    path: queryItem[0],
    id: queryItem[1],
    radius: queryItem[2],
  };
}
