function solution(n) {
  let answer = "";
  let i = 1;
  while (answer.length < n) {
    answer += i % 2 !== 0 ? "수" : "박";
    ++i;
  }
  return answer;
}
