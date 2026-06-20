// https://school.programmers.co.kr/learn/courses/30/lessons/181899

function solution(start_num, end_num) {
  const answer = [];

  for (let i = start_num; i >= end_num; i--) {
    answer.push(i);
  }

  return answer;
}
