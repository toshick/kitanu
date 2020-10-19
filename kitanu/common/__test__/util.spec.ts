import { shuffle, hiraToKana } from '../util';

describe('shuffle', () => {
  test('shuffle', () => {
    const ary1 = Array.from(Array(10)).map((_, index: number) => index);
    const ary2 = shuffle(ary1);
    expect(ary2).not.toEqual(ary1);
  });
});

describe('hiraToKana', () => {
  test('kana', () => {
    const result = hiraToKana('ほんなこつ');
    expect(result).toEqual('ホンナコツ');
  });
});
