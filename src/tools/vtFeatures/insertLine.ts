import { CSI } from './vtfeatures';

export function insertLine(Ps = 1) {
  console.log(CSI + Ps + 'L', '\u009B1F');
}
