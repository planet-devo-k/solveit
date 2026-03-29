function solution(array) {
  const answer = array.sort((a, b) => a - b);
  const num = Math.floor(answer.length / 2);

  return answer[num];
}
