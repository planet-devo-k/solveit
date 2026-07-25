function solution(k, m, score) {
  score.sort((a, b) => b - a);

  let total = 0;

  for (let i = 0; i + m <= score.length; i += m) {
    const box = score.slice(i, i + m);
    const minScore = box[box.length - 1];
    total += minScore * m;
  }

  return total;
}
