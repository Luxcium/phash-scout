import { PHashGetter, QueryResultObject } from '.';
import { CurrentPathError } from './complex-types';
import { FilePathInfo } from './FilePathInfo';
import { GetStats } from './GetStats';
import { PathAndStats } from './PathAndStats';
import { PathWithStats } from './PathWithStats';

export type Strange<Bool extends boolean = true | false> = {
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
  getStats: () => Promise<GetStats>;
  await: {
    getPHash: PHashGetter;
  };
  queryResult: () => Promise<QueryResultObject[] | null>;
} & FilePathInfo<Bool>;
