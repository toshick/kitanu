/**
 * Log
 */
export function logError(err: Error, debug?: string) {
  if (debug) {
    console.log('エラー[', debug, ']', JSON.stringify(err));
  } else {
    console.log(
      'エラーをセット',
      err.message ? err.message : JSON.stringify(err),
    );
  }
}
