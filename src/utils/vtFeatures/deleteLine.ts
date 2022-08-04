import { CSI } from './vtfeatures';

export function deleteLine(Ps = 1) {
  console.log(CSI + Ps + 'M', '\u009B1F');
}
