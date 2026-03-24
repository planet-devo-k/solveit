// https://school.programmers.co.kr/learn/courses/30/lessons/181841

function solution(str_list, ex) {
  let answer = "";
  for (let i of str_list) {
    if (!i.includes(ex)) answer += i;
  }
  return answer;
}
