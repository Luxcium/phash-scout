import { CSI } from '../utils/vtFeatures/vtfeatures';

export function deleteLine(Ps = 1) {
  console.log(CSI + Ps + 'M', '\u009B1F');
}
