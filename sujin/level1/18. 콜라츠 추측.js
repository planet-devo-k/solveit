function solution(num) {
  let answer = 0;
  while (num !== 1) {
    if (num % 2 !== 0) {
      num = num * 3 + 1;
    } else {
      num /= 2;
    }
    ++answer;
  }
  return answer > 501 ? -1 : answer;
}
