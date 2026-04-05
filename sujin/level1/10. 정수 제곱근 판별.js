function solution(n) {
  const SQUARE_ROOT = Math.sqrt(n);
  return Number.isInteger(SQUARE_ROOT) ? (SQUARE_ROOT + 1) ** 2 : -1;
}
