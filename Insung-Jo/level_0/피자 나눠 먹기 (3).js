function solution(slice, n) {
  if (typeof slice !== 'number' || typeof n !== 'number') throw new Error('숫자를 입력해 주세요');
  const pizza = Math.ceil(n / slice);

  return pizza;
}