function solution(my_string, n) {
  let answer = "";
  for (let i = 0; i < my_string.length; i++) {
    [...new Array(n)].forEach((e) => (answer += my_string[i]));
  }
  return answer;
}
