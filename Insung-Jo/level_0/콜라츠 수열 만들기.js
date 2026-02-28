function solution(n) {
  let value = n;
  let count = 0;
  const answer = [];

  while (true) {
    if (count === 0) answer.push(value);

    if (value === 1) {
      break;
    }

    if (value % 2 === 0) {
      value = value / 2;
      answer.push(value);
    } else if (value % 2 !== 0) {
      value = 3 * value + 1;
      answer.push(value);
    }

    count++;
  }

  return answer;
}
