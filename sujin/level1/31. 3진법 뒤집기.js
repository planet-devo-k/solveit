function solution(n) {
  let answer = "";
  while (n > 0) {
    answer += n % 3;
    n = Math.floor(n / 3);
  }
  return parseInt(answer, 3);
}
