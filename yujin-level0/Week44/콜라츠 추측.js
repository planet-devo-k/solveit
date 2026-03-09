function solution(num) {
  let count = 0;

  while (num > 1) {
    num = num % 2 === 0 ? num / 2 : num * 3 + 1;
    count++;
    if (count >= 500) {
      return -1;
    }
  }

  return count;
}
// 다른 풀이
// function solution(num) {
//     let count = 0;
//     while (count < 500) {
//         if (num === 1) {
//             return count;
//         }
//         count ++;
//         num = num % 2 === 0 ? num /2 : num *3 +1;
//     }
//     return -1;
// }
