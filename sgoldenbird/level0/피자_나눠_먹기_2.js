function solution(n) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return n / gcd(6, n);
}
