function solution(num) {
  const number = Math.abs(num);
  if (number % 2 === 1 || number < 0) return "Odd";
  if (number % 2 === 0 || number === 0) return "Even";
}
