function solution(myString) {
  const array = myString.split("x");
  const answer = [];
  for (let string of array) {
    answer.push(string.length);
  }

  return answer;
}
