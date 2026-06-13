function solution(names) {
  const answer = [];

  while (names.length > 0) {
    let extracted = names.splice(0, 5);
    answer.push(extracted[0]);
  }

  return answer;
}
