// https://school.programmers.co.kr/learn/courses/30/lessons/161989

function solution(n, m, section) {
  let count = 0;
  let painted = 0;

  for (const position of section) {
    if (painted < position) {
      count++;
      painted = position + m - 1;
    }
  }

  return count;
}