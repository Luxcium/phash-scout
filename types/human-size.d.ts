declare module 'human-size';

type Mags = ' ' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';
export default function humanSize(
  bytes: number,
  precision?: number
): `${number}B${Mags}`;
