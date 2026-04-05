function solution(numbers) {
  const one_digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let answer = 0;

  for (const i of one_digit) {
    if (!numbers.includes(i)) answer += i;
  }

  return answer;
}
