function solution(my_string) {
  const answer = my_string
    .split("")
    .filter((char) => !isNaN(char))
    .map((el) => Number(el))
    .sort((a, b) => a - b);

  return answer;
}
