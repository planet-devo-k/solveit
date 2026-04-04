// https://school.programmers.co.kr/learn/courses/30/lessons/181842

function solution(str1, str2) {
  return str2.includes(str1) ? 1 : 0;
}

// 다른 풀이
// true → 1, false → 0 변환이 자동으로 일어난다
/**
 * return Number(str2.includes(str1));
 */