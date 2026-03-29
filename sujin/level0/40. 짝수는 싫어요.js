function solution(n) {
  const answer = [1];
  while (answer[answer.length - 1] + 2 <= n) {
    answer.push(answer[answer.length - 1] + 2);
  }
  return answer;
}
