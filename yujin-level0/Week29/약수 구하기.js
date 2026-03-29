function solution(n) {
  let arr = [];
  for (divisor = 1; divisor <= n; divisor++) {
    if (n % divisor === 0) {
      arr.push(divisor);
    }
  }
  return arr;
}

// 다른 풀이
// function solution(n) {
//     return Array(n).fill(0).map((v, index) => v+index+1).filter((v) => n%v===0);
// }
