function solution(array) {
  const answer = [Math.max(...array), array.indexOf(Math.max(...array))];

  return answer;
}
