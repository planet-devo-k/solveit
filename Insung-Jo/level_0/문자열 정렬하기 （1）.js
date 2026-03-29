function solution(my_string) {
  const regex = /[a-zA-Z]+/g;
  const answer = my_string.replace(regex, "").split("").sort().map(Number);

  return answer;
}
