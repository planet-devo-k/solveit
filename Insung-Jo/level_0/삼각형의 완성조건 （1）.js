function solution(sides) {
  const sorted = [...sides].sort((a, b) => a - b); // 배열 정렬
  const max = sorted[2];
  const shortSum = sorted[0] + sorted[1];

  return max >= shortSum ? 2 : 1;
}
