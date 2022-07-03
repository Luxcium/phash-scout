import fs from 'fs';
import { PathWithStats, PHashGetter } from '../../types';
import { immediateZalgo } from '../../utils';
import { bigString } from '../bigString';
import { notExcluded } from '../notExclude';

const phash = require('sharp-phash');

export function makePHashGetter<T extends PathWithStats>(
  imgFile: T
): PHashGetter {
  try {
    if (notExcluded(imgFile)) {
      const thisImage = fs.promises.readFile(imgFile.fullPath);
      return async () => {
        return immediateZalgo({
          pHash: bigString(phash(await thisImage)),
          exclude: false,
        });
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
  return async () => {
    return immediateZalgo({
      pHash: null,
      exclude: true,
    });
  };
  //++ ---------------------------------------------------------------
}
