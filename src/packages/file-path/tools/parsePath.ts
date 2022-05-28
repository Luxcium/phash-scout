import path from 'path';

export function parsePath(fullPath: string) {
  const parsed = path.parse(fullPath);
  return {
    root: parsed.root,
    dir: parsed.dir,
    fileName: parsed.base,
    fullPath,
    baseName: parsed.name,
    ext: parsed.ext,
    extname: parsed.ext.toLowerCase(),
  };
}
