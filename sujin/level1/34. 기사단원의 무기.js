function solution(number, limit, power) {
  const divisorCount = new Array(number + 1).fill(0);

  for (let i = 1; i <= number; i++) {
    for (let multiple = i; multiple <= number; multiple += i) {
      divisorCount[multiple]++;
    }
  }

  let total = 0;
  for (let i = 1; i <= number; i++) {
    const cnt = divisorCount[i];
    total += cnt > limit ? power : cnt;
  }

  return total;
}
