function solution(n) {
  if (typeof n !== 'number') throw new Error('숫자를 입력해 주세요');
  const PIZZA_SLICE = 7;
  const result = Math.ceil( n / PIZZA_SLICE);

  return result;
}