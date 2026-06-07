// https://school.programmers.co.kr/learn/courses/30/lessons/181861

function solution(arr) {
  return arr.reduce((acc, v) => {
    acc.push(...Array(v).fill(v));
    return acc;
  }, []);
}
