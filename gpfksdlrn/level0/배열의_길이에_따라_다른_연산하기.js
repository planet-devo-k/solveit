// https://school.programmers.co.kr/learn/courses/30/lessons/181854

function solution(arr, n) {
  let startIdx = arr.length % 2 === 0 ? 1 : 0;
  for (; startIdx < arr.length; startIdx += 2) {
    arr[startIdx] += n;
  }
  return arr;
}
