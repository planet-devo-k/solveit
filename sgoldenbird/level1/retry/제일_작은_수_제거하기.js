// https://school.programmers.co.kr/learn/courses/30/lessons/12935

function solution(arr) {
  const min = Math.min(...arr);
  const result = arr.filter((i) => i !== min);
  return result.length ? result : [-1];
}
