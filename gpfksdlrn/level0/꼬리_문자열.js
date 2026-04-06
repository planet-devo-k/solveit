// https://school.programmers.co.kr/learn/courses/30/lessons/181841

function solution(str_list, ex) {
  let answer = '';
  for (let str of str_list) {
    if (!str.includes(ex)) answer += str;
  }
  return answer;
}