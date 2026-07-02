// https://school.programmers.co.kr/learn/courses/30/lessons/147355

function solution(t, p) {
  let count = 0;
  const len = p.length;

  for (let i = 0; i <= t.length - len; i++) {
    if (t.slice(i, i + len) <= p) count++;
  }

  return count;
}
