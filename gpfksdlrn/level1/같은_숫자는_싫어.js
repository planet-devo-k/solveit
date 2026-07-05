// https://school.programmers.co.kr/learn/courses/30/lessons/12906

function solution(arr) {
  return arr.filter((value, index) => index === 0 || value !== arr[index - 1]);
}
