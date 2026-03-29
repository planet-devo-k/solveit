function solution(n) {
  var answer = 0;
  let j = n;
  for (let i = 0; i < j; i++) {
    answer += n % 10;
    n = Math.floor(n / 10);
  }
  return answer;
}

// 참고용
// function solution(n) {
//   return n
//     .toString()
//     .split("")
//     .reduce((acc, cur) => acc + Number(cur), 0);
// }
