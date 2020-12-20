/**
 * Log
 */
export function logError(err: Error, debug?: string) {
  if (debug) {
    console.log('エラー[', debug, ']', err);
  } else {
    console.log('エラーをセット', err);
  }
}
