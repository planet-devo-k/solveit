// https://school.programmers.co.kr/learn/courses/30/lessons/181831

function solution(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[i][j] !== arr[j][i]) {
        return 0;
      }
    }
  }
  return 1;
}
