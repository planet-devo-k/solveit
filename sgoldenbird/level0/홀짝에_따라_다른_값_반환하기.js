function solution(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    if (n % 2 !== 0 && i % 2 !== 0) {
      sum += i;
    }

    if (n % 2 === 0 && i % 2 === 0) {
      sum += i ** 2;
    }
  }

  return sum;
}
