import { rConnect } from '../rConnect';
import { isDir } from '../tools';
import { sideFunctionBuilder } from './sideFunctionBuilder';
import { doTraverseDirs } from './sync-directory-traversal';

const Rc = () => rConnect();

void (async function __MAIN__(traverseDir: string) {
  const times: number[] = [];
  if (await isDir(traverseDir)) {
    const RC = Rc();
    const sideFunction = sideFunctionBuilder(RC, times);
    doTraverseDirs(traverseDir, sideFunction, false, false);
  }
})('/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users');
