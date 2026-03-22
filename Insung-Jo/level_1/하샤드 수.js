function solution(x) {
  let answer = String(x).split("");
  let sum = 0;

  for (const i of answer) {
    sum += Number(i);
  }

  if (x % sum === 0) return true;
  if (x % sum !== 0) return false;
}
