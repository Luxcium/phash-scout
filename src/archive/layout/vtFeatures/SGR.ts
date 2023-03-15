export const CSI = '\u009B';
export const SGR = (Pm: any) => `${CSI}${Pm}m`;

// CSI = '\u009B'
// SGR = `${CSI}${Pm}m`;
// SGR = `\u009B${Pm}m`;
/** 0	Normal (default). Resets any other preceding SGR.	✓ */
/** 1	Bold. (also see options.drawBoldTextInBrightColors)	✓ */
/** 2	Faint, decreased intensity.	✓ */
/** 3	Italic.	✓ */
/** 4	Underlined (see below for style support).	✓ */
/** 7	Inverse. Flips foreground and background color.	✓ */
/** 8	Invisible (hidden).	✓ */
/** 9	Crossed-out characters (strikethrough).	✓ */
export const colors = {
  graphicRendition: {
    /** Normal (default). Resets any other preceding SGR. `\u009B0m` ✅ */
    normal: SGR(0),
    /** Bold. (also see options.drawBoldTextInBrightColors) `\u009B1m` ✅ */
    bold: SGR(1),
    /** Faint, decreased intensity. `\u009B2m` ✅ */
    faint: SGR(2),
    /** Italic. `\u009B3m` ✅ */
    italic: SGR(3),
    /** Underlined (see below for style support). `\u009B4m` ✅ */
    underlined: SGR(4),
    /** Inverse. Flips foreground and background color. `\u009B7m` ✅ */
    inverse: SGR(7),
    /** Invisible (hidden). `\u009B8m` ✅ */
    invisible: SGR(8),
    /** Crossed-out characters (strikethrough). `\u009B9m` ✅ */
    crossedOut: SGR(9),
    not: {
      bold: SGR(22),
      faint: SGR(22),
      italic: SGR(23),
      underlined: SGR(24),
      inverse: SGR(27),
      invisible: SGR(28),
      crossedOut: SGR(29),
    },
  },
  black: SGR(30),
  red: SGR(31),
  green: SGR(32),
  yellow: SGR(33),
  blue: SGR(34),
  magenta: SGR(35),
  cyan: SGR(36),
  white: SGR(37),
  indexed: (INDEX: any) => SGR(`${38}:${5}:${INDEX}`),
  extended: (R: number, G: number, B: number) =>
    SGR(`${38}:${2}::${R}:${G}:${B}`),
  normal: SGR(39),
  bg: {
    black: SGR(40),
    red: SGR(41),
    green: SGR(42),
    yellow: SGR(43),
    blue: SGR(44),
    magenta: SGR(45),
    cyan: SGR(46),
    white: SGR(47),
    extended: (R: number, G: number, B: number) =>
      SGR(`${48}:${2}::${R}:${G}:${B}`),
    indexed: (INDEX: any) => SGR(`${48}:${5}:${INDEX}`),
    normal: SGR(49),
  },
  bright: {
    black: SGR(30 + 60),
    red: SGR(31 + 60),
    green: SGR(32 + 60),
    yellow: SGR(33 + 60),
    blue: SGR(34 + 60),
    magenta: SGR(35 + 60),
    cyan: SGR(36 + 60),
    white: SGR(37 + 60),
    indexed: (INDEX: any) => SGR(`${38 + 60}:${5}:${INDEX}`),
    extended: (R: number, G: number, B: number) =>
      SGR(`${38 + 60}:${2}::${R}:${G}:${B}`),
    normal: SGR(39),
    bg: {
      black: SGR(40 + 60),
      red: SGR(41 + 60),
      green: SGR(42 + 60),
      yellow: SGR(43 + 60),
      blue: SGR(44 + 60),
      magenta: SGR(45 + 60),
      cyan: SGR(46 + 60),
      white: SGR(47 + 60),
      indexed: (INDEX: any) => SGR(`${48 + 60}:${5}:${INDEX}`),
      extended: (R: number, G: number, B: number) =>
        SGR(`${48 + 60}:${2}::${R}:${G}:${B}`),
      normal: SGR(49),
    },
  },
};
