// https://school.programmers.co.kr/learn/courses/30/lessons/12982

function solution(d, budget) {
  let count = 0;

  d.sort((a, b) => a - b);

  for (const cost of d) {
    if (budget < cost) break;
    budget -= cost;
    count++;
  }

  return count;
}
