import { PathWithStats, PHashGet } from '../../types';
import { immediateZalgo } from '../../utils';
import { notExcluded } from '../notExclude';
import { getBigStrPHashFromFile } from './getBigStrPHash';

export function makePHashGetter<T extends PathWithStats>(imgFile: T): PHashGet {
  try {
    if (notExcluded(imgFile)) {
      return {
        await: {
          getPHash: async () => {
            return immediateZalgo({
              pHash: await getBigStrPHashFromFile(imgFile.fullPath),
              exclude: false,
            });
          },
        },
      };
    }
  } catch (error) {
    console.error(
      error,
      'Error with file at imgFile:',
      imgFile.fullPath,
      imgFile
    );
  }
  //++ implied else and catched error return here: -------------------
  return {
    await: {
      getPHash: async () => {
        return immediateZalgo({
          pHash: null,
          exclude: true,
        });
      },
    },
  };
  //++ ---------------------------------------------------------------
}
