function solution(s) {
  const STR_LENGTH = s.length;
  return STR_LENGTH % 2 === 0
    ? s.slice(STR_LENGTH / 2 - 1, STR_LENGTH / 2 + 1)
    : s.slice(Math.floor(STR_LENGTH / 2), Math.floor(STR_LENGTH / 2) + 1);
}
a;
