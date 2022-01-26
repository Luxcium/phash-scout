import { Stats } from 'fs';
export declare const statsLister: (stats: Stats) => (string | (() => boolean))[][];
