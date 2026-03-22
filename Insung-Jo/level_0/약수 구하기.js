function solution(n) {
  const answer = [];
  let count = 1;

  while (n >= count) {
    if (n % count === 0) {
      answer.push(count);
    }

    count++;
  }

  return answer.sort((a, b) => a - b);
}
