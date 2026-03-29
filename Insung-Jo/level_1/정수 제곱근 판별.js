function solution(n) {
  let answer = Math.sqrt(n);

  return (answer * 2) % 2 === 0 ? Math.pow(answer + 1, 2) : -1;
}
