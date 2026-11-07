// https://school.programmers.co.kr/learn/courses/30/lessons/120912

function solution(array) {
  return array.reduce((total, num) => {
    return (
      total +
      String(num)
        .split('')
        .filter((char) => char === '7').length
    );
  }, 0);
}
