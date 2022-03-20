import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { BASE_SRC_PATH1 } from '../constants/devPaths';
import { BoxedList } from '../imports';

export function getListingsSync(pathSrc: string = '') {
  const files = getFilesSync(pathSrc);
  const dirs = getDirsSync(pathSrc).map(i => `${i}/`);

  return {
    pathSrc,
    dirs: BoxedList.of(...dirs),
    files: BoxedList.of(...files),
    all: BoxedList.of(...dirs, ...files),
    count: {
      dirs: dirs.length,
      files: files.length,
      all: dirs.length + files.length,
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
    },

    isLeaf() {
      return dirs.length === 0;
    },
    isNode() {
      return dirs.length > 0;
    },
    isEmptyLeaf() {
      return dirs.length === 0 && files.length === 0;
    },
    isEmptyNode() {
      return dirs.length > 0 && files.length === 0;
    },
  };
}

export function getFilesSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  // readdir.filter(i => !i.isDirectory()).map(i => i.name);
  try {
    return readdir.filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export function getDirsSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getListings(pathSrc: string = '') {
  const files = await getFiles(pathSrc);
  const dirs = (await getDirs(pathSrc)).map(i => `${i}`);

  return {
    pathSrc,
    dirs: BoxedList.of(...dirs),
    files: BoxedList.of(...files),
    all: BoxedList.of(...dirs, ...files),
    count: {
      dirs: dirs.length,
      files: files.length,
      all: dirs.length + files.length,
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
    },

    isLeaf() {
      return dirs.length === 0;
    },
    isNode() {
      return dirs.length > 0;
    },
    isEmptyLeaf() {
      return dirs.length === 0 && files.length === 0;
    },
    isEmptyNode() {
      return dirs.length > 0 && files.length === 0;
    },
  };
}

export async function getFiles(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  // readdir.filter(i => !i.isDirectory()).map(i => i.name);
  try {
    return readdir.filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getDirs(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
main; //();
function main() {
  console.log(getFilesSync(BASE_SRC_PATH1 + '/un-named' + '/zoom-x088727222')); //.map(i => console.log(i));
  console.log(getDirsSync(BASE_SRC_PATH1 + '/un-named' + '/zoom-x088727222')); //.map(i => console.log(i));

  const atPath = getListingsSync(BASE_SRC_PATH1);
  atPath.dirs.mapItems<any>(i => {
    console.log(`${i}`);
    return i;
  });
  atPath.files.mapItems<any>(i => {
    console.log(`${i}`);
    return i;
  });
  console.log(atPath);
}
