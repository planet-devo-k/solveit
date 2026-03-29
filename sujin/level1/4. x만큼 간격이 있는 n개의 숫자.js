function solution(x, n) {
  return [...Array(n)].map((el, idx) => x * (idx + 1));
}
