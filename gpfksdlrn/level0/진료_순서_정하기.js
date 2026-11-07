// https://school.programmers.co.kr/learn/courses/30/lessons/120835

function solution(emergency) {
  const sorted = [...emergency].sort((a, b) => b - a);

  return emergency.map((a) => sorted.indexOf(a) + 1);
}