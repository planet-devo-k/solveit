function solution(a, b) {
  const isAOdd = a % 2 === 1;
  const isBOdd = b % 2 === 1;

  if (isAOdd && isBOdd) {
    return a * a + b * b;
  } else if (isAOdd || isBOdd) {
    return 2 * (a + b);
  } else {
    return Math.abs(a - b);
  }
}
