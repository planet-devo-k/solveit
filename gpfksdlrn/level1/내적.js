// https://school.programmers.co.kr/learn/courses/30/lessons/70128

function solution(a, b) {
  let sum = 0;
  const len = a.length;

  for (let i = 0; i < len; i++) {
    sum += a[i] * b[i];
  }

  return sum;
}