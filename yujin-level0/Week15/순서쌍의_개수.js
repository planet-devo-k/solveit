function solution(n) {
  var answer = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) answer += 1;
  }

  return answer;
}

// 참고용
// function solution(n) {
//       return Array(n).fill(1).map((v,idx) => v + idx).filter(v => n % v === 0).length
// }
