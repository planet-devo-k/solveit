// https://school.programmers.co.kr/learn/courses/30/lessons/12903

function solution(s) {
  const middle = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? s[middle - 1] + s[middle] : s[middle];
}