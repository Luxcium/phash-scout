'use strict';
export async function theTryCathBlock({ fnct, errMsg, errVal }, ...args) {
  try {
    return fnct(...args);
  } catch (error) {
    console.error(`at: ${errMsg}\n    error:`, error);
    return errVal;
  }
}
