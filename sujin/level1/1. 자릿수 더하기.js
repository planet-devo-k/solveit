function solution(n) {
  const numToArr = String(n).split("");
  return numToArr.reduce((acc, cur) => Number(acc) + Number(cur), 0);
}
