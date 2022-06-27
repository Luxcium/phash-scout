export type FileTypeInfos<T extends boolean = boolean> = {
  folder: string;
  withStats?: T;
};
