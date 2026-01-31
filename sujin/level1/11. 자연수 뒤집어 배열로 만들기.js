function solution(n) {
  const answer = [];
  const NUM_TO_STR = String(n);
  for (let i = NUM_TO_STR.length - 1; i >= 0; i--) {
    answer.push(Number(NUM_TO_STR[i]));
  }
  return answer;
}
