function solution(my_string) {
  const answer = [];
  for (let i of my_string) {
    if (!isNaN(i)) {
      answer.push(Number(i));
    }
  }
  return answer.sort((a, b) => a - b);
}
