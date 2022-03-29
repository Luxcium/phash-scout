import { RedisClientType } from '../../../core/types';

export type WriterTool = (R: RedisClientType, options: any) => Promise<any[]>;
