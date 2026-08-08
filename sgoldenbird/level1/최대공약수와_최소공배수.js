// 유클리드 호제: 두 수 A와 B가 있을 때, A를 B로 나눈 나머지를 R이라고 하면, A와 B의 최대공약수는 B와 R의 최대공약수와 같다.
function solution(n, m) {
  const gcdFn = (a, b) => (b === 0 ? a : gcdFn(b, a % b));
  const gcdValue = gcdFn(n, m);
  const lcmValue = (n * m) / gcdValue;

  return [gcdValue, lcmValue];
}
