function solution(n) {
  const num = Math.sqrt(n);
  return Number.isInteger(num) ? 1 : 2;
}

// 다른 정수 판별법
// function solution(n) {
//     return Math.sqrt(n) % 1 === 0 ? 1 : 2;
// }
