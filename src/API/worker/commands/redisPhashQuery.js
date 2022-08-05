'use strict';
import { commands } from '.';
import { getRedisQueryResult } from './getRedisQueryResult';
import { pathPaser } from './pathPaser';

export async function redisPhashQuery(imgFileAbsPath) {
  const { pathInfos } = pathPaser(imgFileAbsPath);
  if (pathInfos.extname !== '.jpg') {
    return ['not .jpg'];
  }

  const cachedPhash = commands.get_cached_phash(imgFileAbsPath);
  return getRedisQueryResult(imgFileAbsPath, cachedPhash);
}
