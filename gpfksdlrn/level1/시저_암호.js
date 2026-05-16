// https://school.programmers.co.kr/learn/courses/30/lessons/12926

function solution(s, n) {
  return [...s]
    .map((char) => {
      if (char === ' ') return ' ';

      const code = char.charCodeAt(0);

      // 소문자
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + n) % 26) + 97);
      }

      // 대문자
      return String.fromCharCode(((code - 65 + n) % 26) + 65);
    })
    .join('');
}
