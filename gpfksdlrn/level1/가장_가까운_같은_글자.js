// https://school.programmers.co.kr/learn/courses/30/lessons/142086

function solution(s) {
  const lastIndex = {};
  const result = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    result.push(lastIndex[char] === undefined ? -1 : i - lastIndex[char]);

    lastIndex[char] = i;
  }

  return result;
}
