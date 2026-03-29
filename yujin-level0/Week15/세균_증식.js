function solution(n, t) {
  let sum = n;
  for (let i = 0; i < t; i++) {
    sum *= 2;
  }
  return sum;
}

// 참고용
// function solution(n, t) {
//     return n * Math.pow(2, t);
// }
