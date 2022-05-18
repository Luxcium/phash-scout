import { SplitPath } from '../types';

export const getGroup = (qPath: string) => [...qPath.split(':')][0] || '';
export const getHSize = (qPath: string) =>
  qPath.split(':').slice(1)[0] || '-1b';
export const getSize = (qPath: string) =>
  Number(qPath.split(':').slice(2)[0]) || -1;
export const getPath = (qPath: string) => qPath.split(':').slice(3)[0] || '';

export const getSplit = (qPath: string): SplitPath => ({
  absPath: getPath(qPath),
  group: getGroup(qPath),
  hSize: getHSize(qPath),
  size: getSize(qPath),
});
