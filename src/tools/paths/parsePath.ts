import type { MyParsedPath } from '@types';
import path from 'path';

export function parsePath(fullPath: string): MyParsedPath {
  const parsed = path.parse(fullPath);
  return {
    fullPath,
    dir: parsed.dir,
    fileName: parsed.base,
    baseName: parsed.name,
    ext: parsed.ext,
    extname: parsed.ext.toLowerCase(),
    root: parsed.root,
  };
}
