import { Stats } from 'fs-extra';
import { CurrentPathWithStats } from './CurrentPathWithStats';

export type CurrentPathAndStats = CurrentPathWithStats & Stats;
