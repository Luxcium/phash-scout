import { SplitPath } from '$types/';

('../utils/getSplit');

export function getSplit(qPath: string): SplitPath {
  return {
    dir: getPath(qPath),
    group: getGroup(qPath),
    hSize: getHSize(qPath),
    size: getSize(qPath),
    file: getFile(qPath),
    ext: getExt(qPath),
    fullPath: `${getPath(qPath)}/${getFile(qPath)}`, // .${getExt(qPath)}
  };
}

export const getGroup = (qPath: string) => [...qPath.split(':')][0] || '';
export const getHSize = (qPath: string) =>
  qPath.split(':').slice(1)[0] || '-1b';
export const getSize = (qPath: string) =>
  Number(qPath.split(':').slice(2)[0]) || -1;
export const getPath = (qPath: string) => qPath.split(':').slice(3)[0] || '';
export const getFile = (qPath: string) => qPath.split(':').slice(4)[0] || '';
export const getExt = (qPath: string) => qPath.split(':').slice(5)[0] || '';
