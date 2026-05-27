// https://school.programmers.co.kr/learn/courses/30/lessons/68935

function solution(n) {
  const reversed = n.toString(3).split('').reverse().join('');
  return parseInt(reversed, 3);
}
