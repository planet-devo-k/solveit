// https://school.programmers.co.kr/learn/courses/30/lessons/12940

// 두 수의 [최대공약수, 최소공배수] 반환
function solution(n, m) {
  const gcdValue = gcd(n, m);
  const lcmValue = (n * m) / gcdValue;

  return [gcdValue, lcmValue];
}

// 최대공약수 구하는 함수 (유클리드 호제법)
const gcd = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
