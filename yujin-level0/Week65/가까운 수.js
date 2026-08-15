function solution(array, n) {
  array.sort((a, b) => a - b);

  let answer = array[0];
  let min = 100;
  for (let num of array) {
    let diff = Math.abs(n - num);

    // 가까운 값일 때 갱신
    if (diff < min) {
      min = diff;
      answer = num;
    }
  }
  return answer;
}

// 다른 풀이
// function solution(array, n) {
//     return array.sort((a, b) =>
//         Math.abs(n - a) - Math.abs(n - b) // 1. n과의 거리(절댓값) 기준 정렬
//         || a - b                          // 2. 거리가 같으면 더 작은 숫자 우선
//     )[0];
// }
