// RETRY
function solution(k, m, score) {
  const group = m;
  let income = 0;

  score.sort((a, b) => b - a);

  for (let i = 0; i <= score.length - group; i += group) {
    const minScore = score[i + group - 1];
    income += minScore * group;
  }

  return income;
}
