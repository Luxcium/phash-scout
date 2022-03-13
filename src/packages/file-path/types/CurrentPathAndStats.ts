import { Stats } from 'fs';
import { CurrentPathWithStats } from './CurrentPathWithStats';

export type CurrentPathAndStats = CurrentPathWithStats & Stats;
