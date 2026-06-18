function solution(score) {
  const sums = score.map((s) => s[0] + s[1]);
  const sortedSums = [...sums].sort((a, b) => b - a);
  return sums.map((sum) => sortedSums.indexOf(sum) + 1);
}
