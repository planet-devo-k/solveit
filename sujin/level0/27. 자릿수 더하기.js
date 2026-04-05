function solution(n) {
  let answer = 0;
  for (let i of String(n)) {
    answer += Number(i);
  }
  return answer;
}
