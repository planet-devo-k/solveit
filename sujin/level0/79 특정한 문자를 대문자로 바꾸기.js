function solution(my_string, alp) {
  let answer = "";
  for (let i of my_string) {
    i === alp ? (answer += i.toUpperCase()) : (answer += i);
  }
  return answer;
}
