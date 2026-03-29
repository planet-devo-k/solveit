function solution(numbers) {
  numbers.sort((a, b) => a - b);
  let max = numbers[0] * numbers[1];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] * numbers[i + 1] > max) {
      max = numbers[i] * numbers[i + 1];
    }
  }
  return max;
}
