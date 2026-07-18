function solution(a, b, n) {
  let totalCoke = 0;

  while (n >= a) {
    const newCoke = Math.floor(n / a) * b;

    totalCoke += newCoke;

    n = (n % a) + newCoke;
  }

  return totalCoke;
}
