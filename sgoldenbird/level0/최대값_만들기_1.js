function solution(numbers) {
  numbers.sort((a, b) => a - b);

  const length = numbers.length;
  const max = numbers[length - 1] * numbers[length - 2];

  return max;
}
