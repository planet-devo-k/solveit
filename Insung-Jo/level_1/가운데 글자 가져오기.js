function solution(s) {
  let answer = 0;
  if (s.length % 2 != 0) answer = Math.round(s.length / 2);
  return s.length % 2 != 0
    ? s[answer - 1]
    : s.slice(s.length / 2 - 1, s.length / 2 + 1);
}
