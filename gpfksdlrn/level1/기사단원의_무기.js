// https://school.programmers.co.kr/learn/courses/30/lessons/136798

function solution(number, limit, power) {
  let total = 0;

  for (let i = 1; i <= number; i++) {
    const divisorCount = countDivisors(i);
    total += divisorCount > limit ? power : divisorCount;
  }

  return total;
}

function countDivisors(n) {
  let count = 0;

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count += i * i === n ? 1 : 2;
    }
  }
  
  return count;
}