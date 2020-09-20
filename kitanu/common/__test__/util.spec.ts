import { shuffle } from '../util';

jest.mock('camaleao-design/components/CaModalPG');
jest.mock('camaleao-design/components/CaToastPG');

describe('util', () => {
  test('shuffle', () => {
    const ary1 = Array.from(Array(10)).map((_, index: number) => index);
    const ary2 = shuffle(ary1);
    expect(ary2).not.toEqual(ary1);
  });
});
