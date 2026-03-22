function solution(n) {
  for (let x = 2; x < n; x++) {
    if (n % x === 1) {
      return x;
    }
  }
}

// 다른 풀이
// function solution(n, x = 1) {
//     while (x++) {
//         if (n % x === 1) {
//             return x;
//         }
//     }
// }
