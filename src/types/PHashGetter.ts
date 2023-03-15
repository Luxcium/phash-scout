import { IsNotValidPHash, IsValidPHash } from './ValidPHash';
import { IsExcluded, NotExcluded } from './WithExclude';

export type PHashGetter = () => Promise<
  (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
>;

export type PHashGet = {
  await: {
    getPHash: PHashGetter;
  };
};
