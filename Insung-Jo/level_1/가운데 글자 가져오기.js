function solution(s) {
  const len = s.length;
  const mid = Math.floor(len / 2);

  return len % 2 !== 0 ? s[mid] : s.slice(mid - 1, mid + 1);
}
