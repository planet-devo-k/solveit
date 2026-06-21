function solution(n, k) {
  let i = 1;
  const answer = [];
  while (i * k <= n) {
    answer.push(i * k);
    ++i;
  }
  return answer;
}
