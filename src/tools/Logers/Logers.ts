import { stderr } from 'node:process';

import { DebugLevels } from '../../constants/DebugLevels';
import { VerboLevels } from '../../constants/VerboLevels';
import { colors } from '../../layout';

const { red, green, yellow, normal } = colors;

export class Logers {
  constructor(
    private _verboLevel: VerboLevels,
    private _debug = false,
    private _DebugLevels: DebugLevels = DebugLevels.DEBUG
  ) {}
  logLog = (message = '_', title?: string) => {
    this._cmprV(VerboLevels.LOG) && this._logLog(message, title);
    return message;
  };
  logFatal = (message = '_', title?: string) => {
    this._cmprV(VerboLevels.FATAL) && this._logFatal(message, title);
    return message;
  };
  logError = (message = '_', title?: string) => {
    this._cmprV(VerboLevels.ERROR) && this._logError(message, title);
    return message;
  };
  logWarn = (message = '_', title?: string) => {
    this._cmprV(VerboLevels.WARN) && this._logWarn(message, title);
    return message;
  };
  logInfo = (message = '_', title?: string) => {
    this._cmprV(VerboLevels.INFO) && this._logInfo(message, title);
    return message;
  };
  logDebug = (message = '_', title?: string) => {
    this._cmprD(DebugLevels.DEBUG) && this._logDebug(message, title);
    return message;
  };
  logLow = (message = '_', title?: string) => {
    this._cmprD(DebugLevels.LOW) && this._logLow(message, title);
    return message;
  };
  logMedium = (message = '_', title?: string) => {
    this._cmprD(DebugLevels.MEDIUM) && this._logMedium(message, title);
    return message;
  };
  logHigh = (message = '_', title?: string) => {
    this._cmprD(DebugLevels.HIGH) && this._logHigh(message, title);
    return message;
  };

  _cmprV(setTo: VerboLevels) {
    return this._verboLevel >= setTo;
  }

  _cmprD(setTo: DebugLevels) {
    return this._DebugLevels >= setTo && this._debug;
  }

  _logLog(message = '', title = 'Log') {
    return stderr.write(
      `[${/**/ ''}${normal}"Log"${normal}    ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }

  _logFatal(message = '', title = 'Fatal') {
    stderr.write(
      `[${/**/ ''}${colors.bright.red}"Fatal"${normal}  ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logError(message = '', title = 'Error') {
    stderr.write(
      `[${/**/ ''}${red}"Error"${normal}  ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logWarn(message = '', title = 'Warn') {
    stderr.write(
      `[${/**/ ''}${colors.bright.yellow}"Warn"${normal}   ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logInfo(message = '', title = 'Info') {
    stderr.write(
      `[${/**/ ''}${colors.bright.blue}"Info"${normal}   ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logDebug(message = '', title = 'Debug') {
    stderr.write(
      `[${/**/ ''}${green}"Debug"${normal}  ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logLow(message = '', title = 'Low') {
    stderr.write(
      `[${/**/ ''}${colors.bright.magenta}"Low"${normal}    ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logMedium(message = '', title = 'Medium') {
    stderr.write(
      `[${/**/ ''}${colors.bright.green}"Medium"${normal} ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logHigh(message = '', title = 'High') {
    stderr.write(
      `[${/**/ ''}${yellow}"High"${normal}   ${','} {${t(
        title
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
}

function t(str = '') {
  return `${colors.bright.yellow}"${(str.trim() || '_').replaceAll(
    '"',
    '\\"'
  )}${normal}${colors.bright.yellow}" ${yellow}:${normal}`;
}
