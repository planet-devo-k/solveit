// https://school.programmers.co.kr/learn/courses/30/lessons/181866

function solution(myString) {
  return myString
    .split('x')
    .filter((str) => str !== '')
    .sort();
}
