import { stderr } from 'node:process';

import { colors } from '../layout';
import { DEBUG } from '.';
// %- Understanding logging levels -------------------------------- -%
/**
 * ### Understanding logging levels
 * Each log message has an associated log level that gives a rough
 * guide to the importance and urgency of the message. Each level has
 * an associated integer value usable by rules that monitor system
 * messages.
 *
 * Higher values indicate higher priorities. As such, a rule might
 * look for Error and Fatal messages by looking for values lower than
 * or equal to 2000 (Level >= 2000).
 *
 * You might want to increase the logging level of a logger to
 * diagnose or debug a problem. The default level for all loggers is
 * Inherit, and the default level for the root logger is Info.
 *
 * Do not turn on Debug or higher logging without direction from
 * technical support. Turning on this excessive logging for high
 * module like system, query, or exec can rapidly flood your system
 * and terminate the servers.
 */
export enum VerboLevels {
  /**
   * **Off** → No logging.
   */
  'Off' = -1,

  /**
   * **Inherit** → Inherit the level from the parent logger.
   */
  'Inherit' = 0,

  /**
   * **LOG** → Normal operation output using process.stderr.write
   * to output to the consosole.
   */
  'LOG' = 1,

  /**
   * **FATAL** → Very severe error events that might cause the
   * application to terminate.
   */
  'FATAL' = 1000,

  /**
   * **ERROR** → Error events of considerable importance that will
   * prevent normal program execution, but might still allow the
   * application to continue running.
   */
  'ERROR' = 2000,

  /**
   * **WARN** → Potentially harmful situations of interest to end
   * users or system managers that indicate potential problems.
   */
  'WARN' = 3000,

  /**
   * **INFO** → Informational messages that might make sense to end
   * users and system administrators, and highlight the progress of
   * the application.
   */
  'INFO' = 7000,

  /**
   * **All** → All messages.
   */
  'All' = 110_000,
}

export enum DebugLevels {
  /**
   * **DEBUG** → Relatively detailed tracing used by application
   * developers. The exact meaning of the three debug levels varies
   * among subsystems.
   */
  'DEBUG' = 10_000,

  /**
   * **DEBUG** (*LOW*) → Information broadly interesting to
   * developers who do not have a specialized interest in the
   * specific subsystem. Might include minor (recoverable) failures
   * and issues indicating potential performance problems.
   */
  'LOW' = 20_000,

  /**
   * **DEBUG** (*MEDIUM*) → Fairly detailed tracing messages.
   * Calls for entering, returning, or throwing an exception are
   * traced at this level.
   */
  'MEDIUM' = 30_000,

  /**
   * **DEBUG** (*HIGH*) → Highly detailed tracing messages.
   * Produces the most voluminous output.
   */
  'HIGH' = 70_000,
}

export function setScore(defaultTo = VerboLevels.INFO) {
  return (setTo = VerboLevels.Inherit) => setTo || defaultTo;
}

export function compareScore_On(wanted = VerboLevels.INFO) {
  return (seted = VerboLevels.INFO) => seted >= wanted;
}

export function compareScore_Off(seted = VerboLevels.INFO) {
  return (wanted = VerboLevels.INFO) => wanted >= seted;
}

export function compareScore(seted = VerboLevels.INFO, wanted = VerboLevels.INFO) {
  return wanted >= seted;
}

export const logOff = () => null;

const { red, green, yellow, normal } = colors;

function t(str = '') {
  return `${colors.bright.yellow}"${(str.trim() || '_').replaceAll('"', '\\"')}${normal}${
    colors.bright.yellow
  }" ${yellow}:${normal}`;
}

export const _logLog = (message = '', title = 'Log') =>
  stderr.write(
    `[${/**/ ''}${normal}"Log"${normal}    ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logFatal = (message = '', title = 'Fatal') =>
  stderr.write(
    `[${/**/ ''}${colors.bright.red}"Fatal"${normal}  ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );

export const _logError = (message = '', title = 'Error') =>
  stderr.write(
    `[${/**/ ''}${red}"Error"${normal}  ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logWarn = (message = '', title = 'Warn') =>
  stderr.write(
    `[${/**/ ''}${colors.bright.yellow}"Warn"${normal}   ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logInfo = (message = '', title = 'Info') =>
  stderr.write(
    `[${/**/ ''}${colors.bright.blue}"Info"${normal}   ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logDebug = (message = '', title = 'Debug') =>
  stderr.write(
    `[${/**/ ''}${green}"Debug"${normal}  ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logLow = (message = '', title = 'Low') =>
  stderr.write(
    `[${/**/ ''}${colors.bright.magenta}"Low"${normal}    ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logMedium = (message = '', title = 'Medium') =>
  stderr.write(
    `[${/**/ ''}${colors.bright.green}"Medium"${normal} ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export const _logHigh = (message = '', title = 'High') =>
  stderr.write(
    `[${/**/ ''}${yellow}"High"${normal}   ${','} {${t(title)}${normal} ${message}}, ${performance
      .now()
      .toLocaleString()}], \n`,
    'utf8'
  );
export class Logers {
  constructor(
    private _verboLevel: VerboLevels,
    private _debug = false,
    private _DebugLevels: DebugLevels = DebugLevels.DEBUG
  ) {}
  logLog(message = '', title = '') {
    return this._cmpr(VerboLevels.LOG) && _logLog(message, title);
  }
  logFatal(message = '', title = '') {
    return this._cmpr(VerboLevels.FATAL) && _logFatal(message, title);
  }
  logError(message = '', title = '') {
    return this._cmpr(VerboLevels.ERROR) && _logError(message, title);
  }
  logWarn(message = '', title = '') {
    return this._cmpr(VerboLevels.WARN) && _logWarn(message, title);
  }
  logInfo(message = '', title = '') {
    return this._cmpr(VerboLevels.INFO) && _logInfo(message, title);
  }
  logDebug(message = '', title = '') {
    return this._cmprD(DebugLevels.DEBUG) && _logDebug(message, title);
  }
  logLow(message = '', title = '') {
    return this._cmprD(DebugLevels.LOW) && _logLow(message, title);
  }
  logMedium(message = '', title = '') {
    return this._cmprD(DebugLevels.MEDIUM) && _logMedium(message, title);
  }
  logHigh(message = '', title = '') {
    return this._cmprD(DebugLevels.HIGH) && _logHigh(message, title);
  }

  _cmpr(wanted = VerboLevels.INFO) {
    return this._verboLevel >= wanted;
  }

  _cmprD(wanted = DebugLevels.DEBUG) {
    return this._DebugLevels >= wanted && this._debug;
  }
}

export const logers = new Logers(VerboLevels.INFO, DEBUG, DebugLevels.HIGH);
const { logLog, logFatal, logError, logWarn, logInfo, logDebug, logLow, logMedium, logHigh } = logers;
export { logDebug, logError, logFatal, logHigh, logInfo, logLog, logLow, logMedium, logWarn };

logDebug();
logError();
logFatal();
logHigh();
logInfo();
logLog();
logLow();
logMedium();
logWarn();
