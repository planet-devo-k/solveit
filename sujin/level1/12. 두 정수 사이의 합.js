function solution(a, b) {
  const NUM_ARR = [a, b].sort((a, b) => a - b);
  let answer = NUM_ARR[0];
  if (a === b) return a;
  for (let i = NUM_ARR[0] + 1; i <= NUM_ARR[1]; ++i) {
    answer += i;
  }
  return answer;
}
