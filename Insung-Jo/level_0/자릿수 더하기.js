function solution(n) {
  const answer = String(n).split("");
  let result = 0;

  for (let i of answer) {
    result += Number(i);
  }

  return result;
}
