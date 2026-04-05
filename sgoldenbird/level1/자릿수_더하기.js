function solution(n) {
  return n
    .toString()
    .split("")
    .map((ele) => Number(ele))
    .reduce((acc, cur) => acc + cur, 0);
}
