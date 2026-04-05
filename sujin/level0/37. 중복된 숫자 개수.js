function solution(array, n) {
  let answer = 0;
  array.forEach((i) => {
    if (i == n) answer += 1;
  });
  return answer;
}
