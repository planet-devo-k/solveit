function solution(array, n) {
  const sorted = [...array, n].sort((a, b) => a - b);
  const index = sorted.indexOf(n);

  if (index === 0) return sorted[1];
  if (index === sorted.length - 1) return sorted[sorted.length - 2];

  const left = sorted[index - 1];
  const right = sorted[index + 1];

  return n - left <= right - n ? left : right;
}
