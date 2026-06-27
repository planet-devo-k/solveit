function solution(numbers) {
  let unique_list = new Set();
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      unique_list.add(numbers[i] + numbers[j]);
    }
  }
  return Array.from(unique_list).sort((a, b) => a - b);
}
