function solution(n) {
  // 0부터 n까지의 인덱스를 갖는 배열 생성 (초기값 true)
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  // 2부터 sqrt(n)까지 순회
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      // i의 배수들을 전부 지움 (i * i부터 시작)
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // true인 개수(소수 개수) 계산
  let count = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) count++;
  }

  return count;
}
