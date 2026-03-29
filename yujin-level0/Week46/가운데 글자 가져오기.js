function solution(s) {
  return s.length % 2 === 0
    ? s[s.length / 2 - 1] + s[s.length / 2]
    : s[Math.floor(s.length / 2)];
}

// 다른 풀이
// function solution(s) {
//     return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 ? 1 : 2);
// }
