function solution(n) {
  const result = Math.sqrt(n);

  if (n % result === 0) return 1;
  return 2;
}
