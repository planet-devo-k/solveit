function solution(s) {
  const centerIndex = Math.floor(s.length / 2);
  return s.length % 2 === 0
    ? s.slice(centerIndex - 1, centerIndex + 1)
    : s[centerIndex];
}
