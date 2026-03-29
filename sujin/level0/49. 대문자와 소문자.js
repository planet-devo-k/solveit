function solution(my_string) {
  let answer = "";
  for (const char of my_string) {
    char.toUpperCase() === char ? (answer += char.toLowerCase()) : (answer += char.toUpperCase());
  }
  return answer;
}
