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
    blockDevice: filterBlockDevices,
    characterDevice: filterCharacterDevices,
    directory: filterDirectorys,
    dir: filterDirs,
    fIFO: filterFIFOs,
    file: filterFiles,
    socket: filterSockets,
    symbolicLink: filterSymbolicLinks,
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
