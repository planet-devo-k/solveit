function solution(array, n) {
  return array
    .sort((a, b) => a - b)
    .reduce((acc, cur) => (Math.abs(cur - n) < Math.abs(acc - n) ? cur : acc));
}
