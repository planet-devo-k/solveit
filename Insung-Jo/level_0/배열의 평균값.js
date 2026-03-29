function solution(numbers) {
  let sum = 0;
  numbers.forEach((number) => (sum += number));
  const result = sum / numbers.length;
  return result;
}
