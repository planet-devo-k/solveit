function solution(number, limit, power) {
  let totalWeight = 0;

  for (let i = 1; i <= number; i++) {
    const count = getDivisorCount(i);
    totalWeight += count > limit ? power : count;
  }

  return totalWeight;
}

function getDivisorCount(num) {
  let count = 0;
  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      count += i * i === num ? 1 : 2;
    }
  }
  return count;
}
