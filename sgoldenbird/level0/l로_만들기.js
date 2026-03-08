function solution(myString) {
  let answer = "";
  for (let i of myString) {
    i < "l" ? (answer += "l") : (answer += i);
  }
  return answer;
}
