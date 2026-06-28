function solution(numbers) {
  const result = new Set();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      result.add(numbers[i] + numbers[j]);
    }
  }

  return Array.from(result).sort((a, b) => a - b);
}
