
export function arraySwap(a, b, array) {
  if (a < 0 || a >= array.length || b < 0 || b >= array.length) {
    return;
  }
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
}
