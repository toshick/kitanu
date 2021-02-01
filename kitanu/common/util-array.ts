import { zeropad } from './util-other';
// ----------------------
// Array
// ----------------------

/**
 * arraySliceTo
 */
export function arraySliceTo<T>(myids: T[], num: number): T[][] {
  const myidsSprit = [];
  while (myids.length > num) {
    myidsSprit.push(myids.splice(0, num));
  }
  if (myids.length > 0) {
    myidsSprit.push(myids);
  }
  return myidsSprit;
}

/**
 * arrayShuffle
 */
export function arrayShuffle(array: Array<any>): Array<any> {
  const ret: Array<any> = array.concat();
  for (let i = ret.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = ret[i];
    ret[i] = ret[r];
    ret[r] = tmp;
  }
  return ret;
}

/**
 * arrayAsort
 */
export function arrayAsort(ary: Array<any>, key: string = 'id') {
  return ary.sort((a, b) => {
    const A = zeropad(a[key]);
    const B = zeropad(b[key]);
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  });
}

/**
 * arrayUnique
 */
export function arrayUnique(ary: Array<any>) {
  return Array.from(new Set(ary));
}
