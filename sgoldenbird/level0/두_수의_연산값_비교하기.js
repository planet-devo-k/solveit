function solution(a, b) {
  const joined = Number(`${a}${b}`);
  const product = 2 * a * b;
  return Math.max(joined, product);
}
