function solution(arr, n) {
  let len = arr.length;
  return len % 2 === 0
    ? arr.map((v, i) => (i % 2 === 0 ? v : v + n))
    : arr.map((v, i) => (i % 2 === 0 ? v + n : v));
}

// 개선 풀이
// function solution(arr, n) {
//     return arr.map((v, i) => arr.length % 2 !== i % 2 ? v + n : v);
// }
