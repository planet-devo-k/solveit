function solution(arr, divisor) {
  const answer = [];

  for (const i of arr) {
    if (i % divisor === 0) {
      answer.push(i);
    }
  }

  if (answer.length != 0) {
    answer.sort((a, b) => a - b);
  } else answer.push(-1);

  return answer;
}
