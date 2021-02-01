/**
 * zeropad
 */
export const zeropad = (num: number, keta: number = 5) => {
  let str = `${num}`;
  if (str.length >= keta) return str;
  while (str.length < keta) {
    str = `0${str}`;
  }
  return str;
};
