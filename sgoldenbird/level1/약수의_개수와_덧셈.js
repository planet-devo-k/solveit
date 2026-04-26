function solution(left, right) {
  let sum = 0;
  for (let i = left; i <= right; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      sum -= i;
    } else {
      sum += i;
    }
  }
  return sum;
}
