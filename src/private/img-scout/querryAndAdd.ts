import type { QueryResultObject } from './types';
import { QueryResultItem } from './types';
import { SplitPath } from './types/SplitPath';
import { getSplit } from './utils';

export const hasSomeTitleInclude = (
  title: string,
  queryResult: QueryResultItem[]
) => queryResult.some(i => i[0] === title);

export const shiftTitle =
  (title: string, level = '-1500') =>
  (i: QueryResultItem) => {
    if (i[0] === title) i[2] = level;

    return i;
  };

export const toTup = (queryItem: QueryResultObject) => [
  queryItem.path,
  queryItem.id,
  queryItem.radius,
];

export const toObj = (queryItem: QueryResultItem) => ({
  path: queryItem[0],
  id: queryItem[1],
  radius: queryItem[2],
});

export const toSizedObj = (
  queryItem: QueryResultItem
): SplitPath & QueryResultObject => ({
  ...getSplit(queryItem[0]),
  path: queryItem[0],
  id: queryItem[1],
  radius: queryItem[2],
});
