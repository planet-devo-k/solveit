function solution(d, budget) {
  let answer = 0;

  d.sort((a, b) => a - b);

  for (const cost of d) {
    if (budget < cost) break;
    budget -= cost;
    answer++;
  }

  return answer;
}
