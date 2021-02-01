import { arrayShuffle } from '../util-array';

describe('arrayShuffle', () => {
  test('arrayShuffle', () => {
    const ary1 = Array.from(Array(10)).map((_, index: number) => index);
    const ary2 = arrayShuffle(ary1);
    expect(ary2).not.to.equal(ary1);
  });
});

// describe('hiraToKana', () => {
//   test('kana', () => {
//     const result = hiraToKana('ほんなこつ');
//     expect(result).to.equal('ホンナコツ');
//   });
// });
