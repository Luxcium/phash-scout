import { CSI } from '../utils/vtFeatures/vtfeatures';

export function scroll(Ps = -1) {
  if (Ps < 0) {
    // SU Scroll Up `CSI Ps S` Scroll Ps lines up (default=1).
    console.log(CSI + Ps * -1 + 'S', '\u009B1F');
  } else if (Ps > 0) {
    // SD Scroll Down `CSI Ps T` Scroll Ps lines down (default=1).
    console.log(CSI + Ps + 'T', '\u009B1F');
  } else {
    // DEFAULT: Scroll Down `CSI Ps T` Scroll down 1 lines.
    console.log(CSI + 1 + 'T', '\u009B1F');
  }
  return;
}

export const scrollUp = (Ps = 1) => scroll(Ps * -1);
export const scrollDown = (Ps = 1) => scroll(Ps);
