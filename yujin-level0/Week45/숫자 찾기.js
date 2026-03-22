function solution(num, k) {
  return num.toString().includes(k) ? num.toString().indexOf(k) + 1 : -1;
}

// 다른 풀이
// function solution(num, k) {
//   const index = num.toString().indexOf(String(k));
//   return index === -1 ? -1 : index + 1;
// }
