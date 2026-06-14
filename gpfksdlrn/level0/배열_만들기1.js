// https://school.programmers.co.kr/learn/courses/30/lessons/181901

function solution(n, k) {
  const arr = [];

  for (let i = k; i <= n; i += k) {
    arr.push(i);
  }

  return arr;
}
