function solution(numbers) {
  let sum = 45;
  for (let i of numbers) {
    sum -= i;
  }
  return sum;
}
