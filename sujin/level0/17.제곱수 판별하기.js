function solution(n) {
  const answer = Math.sqrt(n);
  return Number.isInteger(answer) ? 1 : 2;
}
