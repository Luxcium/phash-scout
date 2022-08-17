import { parse } from 'node:path';

export function pathParser(imgFileAbsPath: string) {
  const path = parse(imgFileAbsPath);
  return {
    pathInfos: {
      ...path,
      fullPath: imgFileAbsPath,
      extname: path.ext.toLowerCase(),
      baseName: path.base,
    },
  };
}
