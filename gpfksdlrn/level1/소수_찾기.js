// https://school.programmers.co.kr/learn/courses/30/lessons/12921

// '에라토스테네스의 체' 풀이
function solution(n) {
  const isPrime = Array(n + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;

    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }

  return isPrime.filter(Boolean).length;
}
