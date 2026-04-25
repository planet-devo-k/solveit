function solution(n) {
  const answer = [];
  for (let i = 0; i < n; i++) {
    const temp = [];
    for (let j = 0; j < n; j++) {
      j === i ? temp.push(1) : temp.push(0);
    }
    answer.push(temp);
  }
  return answer;
}
