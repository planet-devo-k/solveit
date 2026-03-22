function solution(n) {
  let count = 0;

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      if (i === n / i) {
        count += 1;
      } else {
        count += 2;
      }
    }
  }

  return count;
}
