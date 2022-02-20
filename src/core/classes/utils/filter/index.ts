import { filterBlockDevices } from './filterBlockDevices';
import { filterCharacterDevices } from './filterCharacterDevices';
import { filterDirectorys } from './filterDirectorys';
import { filterDirs } from './filterDirs';
import { filterFIFOs } from './filterFIFOs';
import { filterFiles } from './filterFiles';
import { filterSockets } from './filterSockets';
import { filterSymbolicLinks } from './filterSymbolicLinks';

const filter = {
  fileType: {
    blockDevices: filterBlockDevices,
    characterDevices: filterCharacterDevices,
    directorys: filterDirectorys,
    dirs: filterDirs,
    fIFOs: filterFIFOs,
    files: filterFiles,
    sockets: filterSockets,
    symbolicLinks: filterSymbolicLinks,
  },
};

export {
  filter,
  filterBlockDevices,
  filterCharacterDevices,
  filterDirectorys,
  filterDirs,
  filterFIFOs,
  filterFiles,
  filterSockets,
  filterSymbolicLinks,
};
