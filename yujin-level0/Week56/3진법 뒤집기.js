function solution(n) {
  let str = "";

  while (n > 0) {
    str += n % 3;
    n = Math.floor(n / 3);
  }

  return parseInt(str, 3);
}
