function solution(n) {
  let num = 1;
  const answer = [];
  while (num <= n) {
    if (n % num === 0) {
      answer.push(num);
    }
    num += 1;
  }
  return answer;
}
