const solution = (x, n) => {
  let arr = [];

  for (i = x; arr.length < n; i += x) {
    arr.push(i);
  }

  return arr;
};

// 다른 풀이
// function solution(x, n) {
//     return Array(n).fill(x).map((v, i) => (i + 1) * v)
// }
