import { promisify } from 'util';

/**
 * @see https://blog.izs.me/2013/08/designing-apis-for-asynchrony
 */
export const restrainingZalgo = () => promisify(setImmediate)();
