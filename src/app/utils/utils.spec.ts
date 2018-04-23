import {arraySwap} from './utils';

describe('array utils', () => {

  it('should swap the array items ', function () {
    let arr = [1, 2, 3];
    arr = arraySwap(0,2, arr);
    expect(arr[0]).toBe(3);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(1);
  });

  it('should not fail on a common error case ', function () {
    let arr = [1, 2, 3];
    arr = arraySwap(5,-3, arr);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
  });
});
