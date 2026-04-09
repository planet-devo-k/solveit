function solution(n) {
  let answer = [];
  for (let i = 0; i < n; i++) {
    i % 2 === 0 ? answer.push("수") : answer.push("박");
  }
  return answer.join("");
}

// 다른 풀이: "수박"을 필요한 만큼 반복해서 길게 만든 뒤, 원하는 길이(n)만큼만 잘라내는 방식
// function solution(n) {
//     return "수박".repeat(n).slice(0, n);
// }
