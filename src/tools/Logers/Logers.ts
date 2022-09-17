import { stderr } from 'node:process';
import { inspect, stripVTControlCharacters } from 'node:util';

import { DebugLevels } from '../../constants/DebugLevels';
import { inspectOptions } from '../../constants/inspectOptions';
import { VerboLevels } from '../../constants/VerboLevels';
import { colors } from '../../layout';

const { red, green, yellow, normal } = colors;

export class Logers {
  constructor(
    private _verboLevel: VerboLevels,
    private _debug = false,
    private _DebugLevels: DebugLevels = DebugLevels.DEBUG
  ) {}
  _msgStr(message: any): string {
    if (typeof message === 'string') {
      // LOG: console.log(message.split('\n').length, message.split('\n'));
      const str_ = message.trim().split('\n');
      if (str_.some(str => str.length > 0)) {
        return `\n${str_.map(str => '  ' + str).join('\n')}\n`;
      }
      return `${message}`.trim() || '_';
    }
    const result = this._msgStr(inspect(message, inspectOptions).trim() || '_');
    return result;
  }
  _titleStr(title: any) {
    return stripVTControlCharacters(String(title).trim()).trim() || '';
  }
  _cmprV(setTo: VerboLevels) {
    return this._verboLevel >= setTo;
  }
  _cmprD(setTo: DebugLevels) {
    return this._DebugLevels >= setTo && this._debug;
  }
  get _performNow() {
    return performance.now().toLocaleString();
  }

  logLog = (message: any = '_', title?: string) => {
    this._cmprV(VerboLevels.LOG) &&
      this._logLog(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logFatal = (message: any = '_', title?: string) => {
    this._cmprV(VerboLevels.FATAL) &&
      this._logFatal(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logError = (message: any = '_', title?: string) => {
    this._cmprV(VerboLevels.ERROR) &&
      this._logError(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logWarn = (message: any = '_', title?: string) => {
    this._cmprV(VerboLevels.WARN) &&
      this._logWarn(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logInfo = (message: any = '_', title?: string) => {
    this._cmprV(VerboLevels.INFO) &&
      this._logInfo(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logDebug = (message: any = '_', title?: string) => {
    this._cmprD(DebugLevels.DEBUG) &&
      this._logDebug(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logLow = (message: any = '_', title?: string) => {
    this._cmprD(DebugLevels.LOW) &&
      this._logLow(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logMedium = (message: any = '_', title?: string) => {
    this._cmprD(DebugLevels.MEDIUM) &&
      this._logMedium(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  logHigh = (message: any, title?: string) => {
    this._cmprD(DebugLevels.HIGH) &&
      this._logHigh(this._msgStr(message), this._titleStr(title || ''));
    return message;
  };
  _logLog(message = '', title = 'Log') {
    stderr.write(
      `[${/**/ ''}${normal}"Log"${normal}    ${','} {${t(
        title || 'Log'
      )}${normal} ${message}}, ${this._performNow}], \n`,
      'utf8'
    );
  }
  _logFatal(message = '', title = 'Fatal') {
    stderr.write(
      `[${/**/ ''}${colors.bright.red}"Fatal"${normal}  ${','} {${t(
        title || 'Fatal'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logError(message = '', title = 'Error') {
    stderr.write(
      `[${/**/ ''}${red}"Error"${normal}  ${','} {${t(
        title || 'Error'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logWarn(message = '', title = 'Warn') {
    stderr.write(
      `[${/**/ ''}${colors.bright.yellow}"Warn"${normal}   ${','} {${t(
        title || 'Warn'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logInfo(message = '', title = 'Info') {
    stderr.write(
      `[${/**/ ''}${colors.bright.blue}"Info"${normal}   ${','} {${t(
        title || 'Info'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logDebug(message = '', title = 'Debug') {
    stderr.write(
      `[${/**/ ''}${green}"Debug"${normal}  ${','} {${t(
        title || 'Debug'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logLow(message = '', title = 'Low') {
    stderr.write(
      `[${/**/ ''}${colors.bright.magenta}"Low"${normal}    ${','} {${t(
        title || 'Low'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logMedium(message = '', title = 'Medium') {
    stderr.write(
      `[${/**/ ''}${colors.bright.green}"Medium"${normal} ${','} {${t(
        title || 'Medium'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
  _logHigh(message = '', title = 'High') {
    stderr.write(
      `[${/**/ ''}${yellow}"High"${normal}   ${','} {${t(
        title || 'High'
      )}${normal} ${message}}, ${performance.now().toLocaleString()}], \n`,
      'utf8'
    );
  }
}

function t(str = '') {
  return `${colors.bright.yellow}"${str
    .trim()
    .replaceAll('"', '\\"')}${normal}${
    colors.bright.yellow
  }" ${yellow}:${normal}`;
}

inspectOptions;
