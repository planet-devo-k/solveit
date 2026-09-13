// https://school.programmers.co.kr/learn/courses/30/lessons/181875

function solution(strArr) {
  return strArr.map((str, idx) => {
    return idx % 2 === 0 ? str.toLowerCase() : str.toUpperCase();
  });
}
