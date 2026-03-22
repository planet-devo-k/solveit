function solution(my_string) {
  const numbers = my_string
    .split("")
    .filter((char) => !isNaN(char))
    .map((el) => Number(el));
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  return sum;
}
