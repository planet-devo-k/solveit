function solution(n) {
  const REPEAT_COUNT = Math.ceil(n / 2);

  return "수박".repeat(REPEAT_COUNT).slice(0, n);
}
