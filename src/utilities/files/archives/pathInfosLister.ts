import {
  basename,
  delimiter,
  dirname,
  extname,
  isAbsolute,
  normalize,
  parse,
  sep,
  toNamespacedPath,
} from 'path';

export const pathInfos = (pathStr: string) => [
  ['.dirname', dirname(pathStr)],
  ['.extname', extname(pathStr)],
  ['.isAbsolute', isAbsolute(pathStr)],
  ['.normalize', normalize(pathStr)],
  ['.parse', parse(pathStr)],
  ['.toNamespacedPath', toNamespacedPath(pathStr)],
  ['.basename', basename(pathStr)],
  ['.delimiter', delimiter],
  ['.sep', sep],
];
