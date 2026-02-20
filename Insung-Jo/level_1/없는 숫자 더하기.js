function solution(numbers) {
  const MAX_NUMBER = 45;
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }

  return MAX_NUMBER - sum;
}
