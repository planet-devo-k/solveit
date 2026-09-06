function solution(i, j, k) {
  let answer = 0;

  for (let num = i; num <= j; num++) {
    answer += String(num).split(k).length - 1;
  }

  return answer;
}
