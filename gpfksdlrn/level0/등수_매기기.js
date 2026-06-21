// https://school.programmers.co.kr/learn/courses/30/lessons/120882

function solution(score) {
  const totals = score.map(([eng, math]) => eng + math);

  return totals.map(
    (current) => totals.filter((other) => other > current).length + 1,
  );
}
