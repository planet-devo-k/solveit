function solution(my_string, letter) {
  let answer = "";
  for (const e of my_string) {
    e !== letter ? (answer += e) : answer;
  }
  return answer;
}
