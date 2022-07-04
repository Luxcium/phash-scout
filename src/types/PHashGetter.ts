import { IsExcluded, IsNotValidPHash, IsValidPHash, NotExcluded } from '.';

export type PHashGetter = () => Promise<
  (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
>;

export type PHashGet = {
  await: {
    getPHash: PHashGetter;
  };
};
