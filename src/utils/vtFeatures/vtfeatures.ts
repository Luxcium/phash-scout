/** CSI	Control Sequence Introducer	\x9B	Start of a CSI sequence.	✓   */
export const CSI = '\u009B';
export const SP = '\u0020';
// `${'\u009B'}0K`;
/**
 * **ESC :**	Escape	`\e`, `\x1B`	Start of a sequence. \
 * Cancels any other sequence.
 */
export const ESC = '\u001B';

// Mnemonic	Name	Sequence	Short Description	Support
/** ICH	Insert Characters	CSI Ps @	Insert Ps (blank) characters (default = 1). more	✓ */
export const ICH = (Ps: number) => `${CSI}${Ps}@`;
/** SL	Scroll Left	CSI Ps SP @	Scroll viewport Ps times to the left. more	✓ */
export const SL = (Ps: number) => `${CSI}${Ps}${SP}@`;
/** CUU	Cursor Up	CSI Ps A	Move cursor Ps times up (default=1). more	✓ */
export const CUU = (Ps: number) => `${CSI}${Ps}A`;
/** SR	Scroll Right	CSI Ps SP A	Scroll viewport Ps times to the right. more	✓ */
export const SR = (Ps: number) => `${CSI}${Ps}${SP}A`;
/** CUD	Cursor Down	CSI Ps B	Move cursor Ps times down (default=1). more	✓ */
export const CUD = (Ps: number) => `${CSI}${Ps}B`;
/** CUF	Cursor Forward	CSI Ps C	Move cursor Ps times forward (default=1).	✓ */
export const CUF = (Ps: number) => `${CSI}${Ps}C`;
/** CUB	Cursor Backward	CSI Ps D	Move cursor Ps times backward (default=1).	✓ */
export const CUB = (Ps: number) => `${CSI}${Ps}D`;
/** CNL	Cursor Next Line	CSI Ps E	Move cursor Ps times down (default=1) and to the first column. more	✓ */
export const CNL = (Ps: number) => `${CSI}${Ps}E`;
/** CPL	Cursor Backward	CSI Ps F	Move cursor Ps times up (default=1) and to the first column. more	✓ */
export const CPL = (Ps: number) => `${CSI}${Ps}F`;
/** CHA	Cursor Horizontal Absolute	CSI Ps G	Move cursor to Ps-th column of the active row (default=1).	✓ */
export const CHA = (Ps: number) => `${CSI}${Ps}G`;
/** CUP	Cursor Position	CSI Ps ; Ps H	Set cursor to position [Ps, Ps] (default = [1, 1]). more	✓ */
export const CUP = (Ps: number) => `${CSI}${Ps}; Ps H`;
/** CHT	Cursor Horizontal Tabulation	CSI Ps I	Move cursor Ps times tabs forward (default=1).	✓ */
export const CHT = (Ps: number) => `${CSI}${Ps}I`;
/** ED	Erase In Display	CSI Ps J	Erase various parts of the viewport. more	✓ */
export const ED = (Ps: number) => `${CSI}${Ps}J`;
/**  DECSED	Selective Erase In Display	CSI ? Ps J	Currently the same as ED.	Partial*/
export const DECSED = (Ps: number) => `${CSI}?${Ps}J`;
/** EL	Erase In Line	CSI Ps K	Erase various parts of the active row. ✓
 * Ps	Effect
 *
 * | Ps | Effect |
 * | :--- | :--- |
 * | `0` | Erase from the cursor through the end of the row. |
 * | `1` | Erase from the beginning of the line through the cursor. |
 * | `2` | Erase complete line. |
 */
export const EL = (Ps: number) => `${CSI}${Ps}K`;
/** EL	Erase In Line	CSI Ps K	Erase various parts of the active row. more	✓
 * Ps	Effect
 *
 * | Ps | Effect | Default |
 * | :--- | :--- | ---: |
 * | `0` | Erase from the cursor through the end of the row. | ✓ |
 * | `1` | Erase from the beginning of the line through the cursor. | |
 * | `2` | Erase complete line. | |
 */
export const EL0 = (Ps = 0) => `${CSI}${Ps}K`;
/** EL	Erase In Line	CSI Ps K	Erase various parts of the active row. more	✓
 * Ps	Effect
 *
 * | Ps | Effect | Default |
 * | :--- | :--- | ---: |
 * | `0` | Erase from the cursor through the end of the row. ||
 * | `1` | Erase from the beginning of the line through the cursor. | ✓ |
 * | `2` | Erase complete line. ||
 */
export const EL1 = (Ps = 1) => `${CSI}${Ps}K`;
/** EL	Erase In Line	CSI Ps K	Erase various parts of the active row. more	✓
 * Ps	Effect
 *
 * | Ps | Effect | Default |
 * | :--- | :--- | ---: |
 * | `0` | Erase from the cursor through the end of the row. | |
 * | `1` | Erase from the beginning of the line through the cursor. | |
 * | `2` | Erase complete line. | ✓ |
 */
export const EL2 = (Ps = 2) => `${CSI}${Ps}K`;
//
/**  DECSEL	Selective Erase In Line	CSI ? Ps K	Currently the same as EL.	Partial*/
export const DECSEL = (Ps: number) => `${CSI}?${Ps}K`;
/** IL	Insert Line	CSI Ps L	Insert Ps blank lines at active row (default=1). more	✓ */
export const IL = (Ps: number) => `${CSI}${Ps}L`;
/** DL	Delete Line	CSI Ps M	Delete Ps lines at active row (default=1). more	✓ */
export const DL = (Ps: number) => `${CSI}${Ps}M`;
/** DCH	Delete Character	CSI Ps P	Delete Ps characters (default=1). more	✓ */
export const DCH = (Ps: number) => `${CSI}${Ps}P`;
/** SU	Scroll Up	CSI Ps S	Scroll Ps lines up (default=1).	✓ */
export const SU = (Ps: number) => `${CSI}${Ps}S`;
/** SD	Scroll Down	CSI Ps T	Scroll Ps lines down (default=1).	✓ */
export const SD = (Ps: number) => `${CSI}${Ps}T`;
/** ECH	Erase Character	CSI Ps X	Erase Ps characters from current cursor position to the right (default=1). more	✓ */
export const ECH = (Ps: number) => `${CSI}${Ps}X`;
/** CBT	Cursor Backward Tabulation	CSI Ps Z	Move cursor Ps tabs backward (default=1).	✓ */
export const CBT = (Ps: number) => `${CSI}${Ps}Z`;
/** HPA	Horizontal Position Absolute	CSI Ps `	Same as CHA.	✓ */
export const HPA = (Ps: number) => `${CSI}${Ps}`;
/** HPR	Horizontal Position Relative	CSI Ps a	Same as CUF.	✓ */
export const HPR = (Ps: number) => `${CSI}${Ps}a`;
/** REP	Repeat Preceding Character	CSI Ps b	Repeat preceding character Ps times (default=1). more	✓ */
export const REP = (Ps: number) => `${CSI}${Ps}b`;
/** DA1	Primary Device Attributes	CSI c	Send primary device attributes.	✓ */
export const DA1 = () => `${CSI}c`;
/** DA2	Secondary Device Attributes	CSI > c	Send primary device attributes.	✓ */
export const DA2 = () => `${CSI}>c`;
/** VPA	Vertical Position Absolute	CSI Ps d	Move cursor to Ps-th row (default=1).	✓ */
export const VPA = (Ps: number) => `${CSI}${Ps}d`;
/** VPR	Vertical Position Relative	CSI Ps e	Move cursor Ps times down (default=1).	✓ */
export const VPR = (Ps: number) => `${CSI}${Ps}e`;
/** HVP	Horizontal and Vertical Position	CSI Ps ; Ps f	Same as CUP.	✓ */ // [hps,vps]:HpsVps
type HpsVps = [vertical: number, horizontal: number];
export const HVP = ([hPs, vPs]: HpsVps) => `${CSI}${hPs};${vPs}f`;
/** TBC	Tab Clear	CSI Ps g	Clear tab stops at current position (0) or all (3) (default=0). more	✓ */
export const TBC = (Ps: number) => `${CSI}${Ps}g`;
/**  SM	Set Mode	CSI Pm h	Set various terminal modes. more	Partial*/
export const SM = (Pm: any) => `${CSI}${Pm}h`;
/**  DECSET	DEC Private Set Mode	CSI ? Pm h	Set various terminal attributes. more	Partial*/
export const DECSET = (Pm: any) => `${CSI}?${Pm}h`;
/**  RM	Reset Mode	CSI Pm l	Set various terminal attributes. more	Partial*/
export const RM = (Pm: any) => `${CSI}${Pm}l`;
/**  DECRST	DEC Private Reset Mode	CSI ? Pm l	Reset various terminal attributes. more	Partial*/
export const DECRST = (Pm: any) => `${CSI}?${Pm}l`;
/**  SGR	Select Graphic Rendition	CSI Pm m	Set/Reset various text attributes. more	Partial*/
export const SGR = (Pm: any) => `${CSI}${Pm}m`;
/** DSR	Device Status Report	CSI Ps n	Request cursor position (CPR) with Ps = 6.	✓ */
export const DSR = (Ps: number) => `${CSI}${Ps}n`;
/**  DECDSR	DEC Device Status Report	CSI ? Ps n	Only CPR is supported (same as DSR).	Partial*/
export const DECDSR = (Ps: number) => `${CSI}?${Ps}n`;
/** DECSTR	Soft Terminal Reset	CSI ! p	Reset several terminal attributes to initial state. more	✓ */
export const DECSTR = () => `${CSI}!p`;
/** DECSCUSR	Set Cursor Style	CSI Ps SP q	Set cursor style. more	✓ */
export const DECSCUSR = (Ps: number) => `${CSI}${Ps}${SP}q`;
/** DECSTBM	Set Top and Bottom Margin	CSI Ps ; Ps r	Set top and bottom margins of the viewport [top;bottom] (default = viewport size).	✓ */ // [hps,vps]:HpsVps
type PstPsb = [top: number, bottom: number];
export const DECSTBM = ([Pst, Psb]: PstPsb) => `${CSI}${Pst};${Psb}r`;
/**  SCOSC	Save Cursor	CSI s	Save cursor position, charmap and text attributes.	Partial*/
export const SCOSC = () => `${CSI}s`;
/**  SCORC	Restore Cursor	CSI u	Restore cursor position, charmap and text attributes.	Partial*/
export const SCORC = () => `${CSI}u`;
/** DECIC	Insert Columns	CSI Ps ' }	Insert Ps columns at cursor position. more	✓ */
export const DECIC = (Ps: number) => `${CSI}${Ps}'}`;
/** DECDC	Delete Columns	CSI Ps ' ~	Delete Ps columns at cursor position. more	✓ */
export const DECDC = (Ps: number) => `${CSI}${Ps}'~`;

export const csi: {
  /** ICH	Insert Characters	CSI Ps @	Insert Ps (blank) characters (default : typeof 1). more	✓ */
  InsertCharacters: typeof ICH;
  /** SL	Scroll Left	CSI Ps SP @	Scroll viewport Ps times to the left. more	✓ */
  ScrollLeft: typeof SL;
  /** CUU	Cursor Up	CSI Ps A	Move cursor Ps times up (default: typeof1). more	✓ */
  CursorUp: typeof CUU;
  /** SR	Scroll Right	CSI Ps SP A	Scroll viewport Ps times to the right. more	✓ */
  ScrollRight: typeof SR;
  /** CUD	Cursor Down	CSI Ps B	Move cursor Ps times down (default: typeof1). more	✓ */
  CursorDown: typeof CUD;
  /** CUF	Cursor Forward	CSI Ps C	Move cursor Ps times forward (default: typeof1).	✓ */
  CursorForward: typeof CUF;
  /** CUB	Cursor Backward	CSI Ps D	Move cursor Ps times backward (default: typeof1).	✓ */
  CursorBackward1: typeof CUB;
  /** CNL	Cursor Next Line	CSI Ps E	Move cursor Ps times down (default: typeof1) and to the first column. more	✓ */
  CursorNextLine: typeof CNL;
  /** CPL	Cursor Backward	CSI Ps F	Move cursor Ps times up (default: typeof1) and to the first column. more	✓ */
  CursorBackward2: typeof CPL;
  /** CHA	Cursor Horizontal Absolute	CSI Ps G	Move cursor to Ps-th column of the active row (default: typeof1).	✓ */
  CursorHorizontalAbsolute: typeof CHA;
  /** CUP	Cursor Position	CSI Ps ; Ps H	Set cursor to position [Ps, Ps] (default : typeof [1, 1]). more	✓ */
  CursorPosition: typeof CUP;
  /** CHT	Cursor Horizontal Tabulation	CSI Ps I	Move cursor Ps times tabs forward (default: typeof1).	✓ */
  CursorHorizontalTabulation: typeof CHT;
  /** ED	Erase In Display	CSI Ps J	Erase various parts of the viewport. more	✓ */
  EraseInDisplay: typeof ED;
  /** DECSED	Selective Erase In Display	CSI ? Ps J	Currently the same as ED.	Partial*/
  SelectiveEraseInDisplay: typeof DECSED;
  /** EL	Erase In Line	CSI Ps K	Erase various parts of the active row. more	✓ */
  EraseInLine: typeof EL;
  /** DECSEL	Selective Erase In Line	CSI ? Ps K	Currently the same as EL.	Partial*/
  SelectiveEraseInLine: typeof DECSEL;
  /** IL	Insert Line	CSI Ps L	Insert Ps blank lines at active row (default: typeof1). more	✓ */
  InsertLine: typeof IL;
  /** DL	Delete Line	CSI Ps M	Delete Ps lines at active row (default: typeof1). more	✓ */
  DeleteLine: typeof DL;
  /** DCH	Delete Character	CSI Ps P	Delete Ps characters (default: typeof1). more	✓ */
  DeleteCharacter: typeof DCH;
  /** SU	Scroll Up	CSI Ps S	Scroll Ps lines up (default: typeof1).	✓ */
  ScrollUp: typeof SU;
  /** SD	Scroll Down	CSI Ps T	Scroll Ps lines down (default: typeof1).	✓ */
  ScrollDown: typeof SD;
  /** ECH	Erase Character	CSI Ps X	Erase Ps characters from current cursor position to the right (default: typeof1). more	✓ */
  EraseCharacter: typeof ECH;
  /** CBT	Cursor Backward Tabulation	CSI Ps Z	Move cursor Ps tabs backward (default: typeof1).	✓ */
  CursorBackwardTabulation: typeof CBT;
  /** HPA	Horizontal Position Absolute	CSI Ps `	Same as CHA.	✓ */
  HorizontalPositionAbsolute: typeof HPA;
  /** HPR	Horizontal Position Relative	CSI Ps a	Same as CUF.	✓ */
  HorizontalPositionRelative: typeof HPR;
  /** REP	Repeat Preceding Character	CSI Ps b	Repeat preceding character Ps times (default: typeof1). more	✓ */
  RepeatPrecedingCharacter: typeof REP;
  /** DA1	Primary Device Attributes	CSI c	Send primary device attributes.	✓ */
  PrimaryDeviceAttributes: typeof DA1;
  /** DA2	Secondary Device Attributes	CSI > c	Send primary device attributes.	✓ */
  SecondaryDeviceAttributes: typeof DA2;
  /** VPA	Vertical Position Absolute	CSI Ps d	Move cursor to Ps-th row (default: typeof1).	✓ */
  VerticalPositionAbsolute: typeof VPA;
  /** VPR	Vertical Position Relative	CSI Ps e	Move cursor Ps times down (default: typeof1).	✓ */
  VerticalPositionRelative: typeof VPR;
  /** HVP	Horizontal and Vertical Position	CSI Ps ; Ps f	Same as CUP.	✓ */
  HorizontalandVerticalPosition: typeof HVP;
  /** TBC	Tab Clear	CSI Ps g	Clear tab stops at current position (0) or all (3) (default: typeof0). more	✓ */
  TabClear: typeof TBC;
  /** SM	Set Mode	CSI Pm h	Set various terminal modes. more	Partial*/
  SetMode: typeof SM;
  /** DECSET	DEC Private Set Mode	CSI ? Pm h	Set various terminal attributes. more	Partial*/
  DECPrivateSetMode: typeof DECSET;
  /** RM	Reset Mode	CSI Pm l	Set various terminal attributes. more	Partial*/
  ResetMode: typeof RM;
  /** DECRST	DEC Private Reset Mode	CSI ? Pm l	Reset various terminal attributes. more	Partial*/
  DECPrivateResetMode: typeof DECRST;
  /** SGR	Select Graphic Rendition	CSI Pm m	Set/Reset various text attributes. more	Partial*/
  SelectGraphicRendition: typeof SGR;
  /** DSR	Device Status Report	CSI Ps n	Request cursor position (CPR) with Ps : typeof 6.	✓ */
  DeviceStatusReport: typeof DSR;
  /** DECDSR	DEC Device Status Report	CSI ? Ps n	Only CPR is supported (same as DSR).	Partial*/
  DECDeviceStatusReport: typeof DECDSR;
  /** DECSTR	Soft Terminal Reset	CSI ! p	Reset several terminal attributes to initial state. more	✓ */
  SoftTerminalReset: typeof DECSTR;
  /** DECSCUSR	Set Cursor Style	CSI Ps SP q	Set cursor style. more	✓ */
  SetCursorStyle: typeof DECSCUSR;
  /** DECSTBM	Set Top and Bottom Margin	CSI Ps ; Ps r	Set top and bottom margins of the viewport [top;bottom] (default : typeof viewport size).	✓ */
  SetTopandBottomMargin: typeof DECSTBM;
  /** SCOSC	Save Cursor	CSI s	Save cursor position, charmap and text attributes.	Partial*/
  SaveCursor: typeof SCOSC;
  /** SCORC	Restore Cursor	CSI u	Restore cursor position, charmap and text attributes.	Partial*/
  RestoreCursor: typeof SCORC;
  /** DECIC	Insert Columns	CSI Ps ' }	Insert Ps columns at cursor position. more	✓ */
  InsertColumns: typeof DECIC;
  /** DECDC	Delete Columns	CSI Ps ' ~	Delete Ps columns at cursor position. more	✓ */
  DeleteColumns: typeof DECDC;
} = {
  InsertCharacters: ICH,
  ScrollLeft: SL,
  CursorUp: CUU,
  ScrollRight: SR,
  CursorDown: CUD,
  CursorForward: CUF,
  CursorBackward1: CUB,
  CursorNextLine: CNL,
  CursorBackward2: CPL,
  CursorHorizontalAbsolute: CHA,
  CursorPosition: CUP,
  CursorHorizontalTabulation: CHT,
  EraseInDisplay: ED,
  SelectiveEraseInDisplay: DECSED,
  EraseInLine: EL,
  SelectiveEraseInLine: DECSEL,
  InsertLine: IL,
  DeleteLine: DL,
  DeleteCharacter: DCH,
  ScrollUp: SU,
  ScrollDown: SD,
  EraseCharacter: ECH,
  CursorBackwardTabulation: CBT,
  HorizontalPositionAbsolute: HPA,
  HorizontalPositionRelative: HPR,
  RepeatPrecedingCharacter: REP,
  PrimaryDeviceAttributes: DA1,
  SecondaryDeviceAttributes: DA2,
  VerticalPositionAbsolute: VPA,
  VerticalPositionRelative: VPR,
  HorizontalandVerticalPosition: HVP,
  TabClear: TBC,
  SetMode: SM,
  DECPrivateSetMode: DECSET,
  ResetMode: RM,
  DECPrivateResetMode: DECRST,
  SelectGraphicRendition: SGR,
  DeviceStatusReport: DSR,
  DECDeviceStatusReport: DECDSR,
  SoftTerminalReset: DECSTR,
  SetCursorStyle: DECSCUSR,
  SetTopandBottomMargin: DECSTBM,
  SaveCursor: SCOSC,
  RestoreCursor: SCORC,
  InsertColumns: DECIC,
  DeleteColumns: DECDC,
};
