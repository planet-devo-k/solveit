function solution(n) {
  const answer = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      answer[i].push(j === i ? 1 : 0);
    }
  }

  return answer;
}
