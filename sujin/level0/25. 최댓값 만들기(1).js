function solution(numbers) {
  const sortedArr = numbers.sort((a, b) => a - b);
  const LENGTH = numbers.length;
  return sortedArr[LENGTH - 1] * sortedArr[LENGTH - 2];
}
