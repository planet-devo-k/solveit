function solution(n, k) {
  return Array.from(
    { length: Math.floor(n / k) },
    (_, index) => (index + 1) * k,
  );
}
