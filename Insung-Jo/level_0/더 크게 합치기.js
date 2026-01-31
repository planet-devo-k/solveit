function solution(a, b) {
  const value1 = Number(`${a}${b}`);
  const value2 = Number(`${b}${a}`);

  return Math.max(value1, value2);
}
