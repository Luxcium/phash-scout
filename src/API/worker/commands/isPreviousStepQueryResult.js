'use strict';

export async function isPreviousStepQueryResult(previousStepResult) {
  try {
    if (Array.isArray(previousStepResult)) {
      if (previousStepResult.length > 0) {
        return previousStepResult;
      } else {
        console.error(
          'at: 001 redis_phash_query_result([])↓\n    error:',
          'TypeError: previousStepResult is an empty array for ' + 'messageId: '
        );
        return false;
      }
    }
    if (!previousStepResult || !previousStepResult.queryResult) {
      console.error(
        'at: 002 redis_phash_query_result([])↓\n    error:',
        `TypeError: previousStepResult${
          !previousStepResult
            ? ' is ' + undefined
            : !previousStepResult.queryResult
            ? '.queryResult is undefined' + previousStepResult
            : typeof previousStepResult.queryResult !== 'function'
            ? '.queryResult is not a function'
            : ' is' + null + 'will return [](`never`)↓'
        }`
      );
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
}
