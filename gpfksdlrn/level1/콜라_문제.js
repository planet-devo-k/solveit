// https://school.programmers.co.kr/learn/courses/30/lessons/132267

function solution(a, b, n) {
  let answer = 0;

  while (n >= a) {
    const exchange = Math.floor(n / a);
    answer += exchange * b;
    n = (n % a) + exchange * b;
  }

  return answer;
}