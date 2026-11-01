// https://school.programmers.co.kr/learn/courses/30/lessons/131128

function solution(X, Y) {
  const countX = Array(10).fill(0);
  const countY = Array(10).fill(0);

  for (const ch of X) countX[ch]++;
  for (const ch of Y) countY[ch]++;

  let answer = '';

  // 큰 숫자부터 붙여야 가장 큰 수가 되므로 9 → 0 순서로 순회
  for (let d = 9; d >= 0; d--) {
    answer += String(d).repeat(Math.min(countX[d], countY[d]));
  }

  if (answer === '') return '-1';
  if (answer[0] === '0') return '0';

  return answer;
}
