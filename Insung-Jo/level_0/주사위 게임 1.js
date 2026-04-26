function solution(a, b) {
  const ODD_ALL = a % 2 !== 0 && b % 2 !== 0;
  const ODD_ONE = a % 2 !== 0 || b % 2 !== 0;

  if (ODD_ALL) return a * a + b * b;
  if (ODD_ONE) return 2 * (a + b);

  return Math.abs(a - b);
}
