function solution(my_string, k) {
  let i = 0;
  let answer = "";

  while (i < k) {
    answer += my_string;
    i++;
  }
  return answer;
}
