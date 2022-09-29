import { Logers } from '../tools/Logers/Logers';
import { DebugLevels } from './DebugLevels';
import { VerboLevels } from './VerboLevels';

export const PROCESSED = 'PROCESSED';
export const UNPROCESSED = 'UNPROCESSED';
export const PRE_CACHING = true;
export const VERBOSA = { sideFunction: true };
export const VERBO_LEVEL: VerboLevels = VerboLevels.INFO;
export const DEBUG: boolean = true;
export const DEBUG_LEVEL: DebugLevels = DebugLevels.DEBUG;

const logers = new Logers(VERBO_LEVEL, DEBUG, DEBUG_LEVEL);

export const {
  logLog,
  logFatal,
  logError,
  logWarn,
  logInfo,
  logDebug,
  logLow,
  logMedium,
  logHigh,
} = logers;
export { logers };
export const REDIS_DEFAULT_PORT = 6383;
export const DB_NUMBER = 5;
export const PRINT_EACH = 1;
export const AVERAGE_EACH = 50;
export const AWAIT_EACH = 100;
export const USEWORKER = false;

export const flags = {
  isOpenDirSYNC: false,
  isReadSYNC: false,
  isCloseDirSYNC: false,
  AWAIT_EACH,
};

// logLog(',');
// logFatal(',');
// logError(',');
// logWarn(',');
// logInfo(',');
// logDebug(',');
// logLow(',');
// logMedium(',');
// logHigh(',');
