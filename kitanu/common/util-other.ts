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

/**
 * getMimeFromBase64
 */
export const getMimeTypeFromBase64 = (base64: string): string => {
  const parts = base64.split(';base64,');
  const type = parts[0].split(':')[1];
  return type;
};

/**
 * base64ToFile
 */
export const base64ToFile = (
  base64: string,
  filename: string,
): Promise<File> => {
  const type = getMimeTypeFromBase64(base64);
  return fetch(base64)
    .then((response) => response.blob())
    .then((blob) => {
      return new File([blob], filename, { type });
    });
};
