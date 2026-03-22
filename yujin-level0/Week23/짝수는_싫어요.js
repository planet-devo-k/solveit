function solution(n) {
  var answer = [];

  for (let i = 1; i <= n; i++) {
    if (i % 2 != 0) {
      answer.push(i);
    }
  }

  return answer;
}

// 다른 풀이
// function solution(n) {
//     var answer = [];
//     for (let i = 1; i<=n; i+=2) answer.push(i)
//     return answer;
// }
