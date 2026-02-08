function solution(n) {
  const answer = [];
  let temp = n;

  while (temp > 1) {
    answer.push(temp);
    temp = temp % 2 === 0 ? temp / 2 : 3 * temp + 1;
  }

  answer.push(1);

  return answer;
}
