function solution(a, b) {
  let answer = 0;
  if (a % 2 === 0 && b % 2 === 0) {
    answer = Math.abs(a - b);
  } else if (a % 2 !== 0 && b % 2 !== 0) {
    answer = a ** 2 + b ** 2;
  } else {
    answer = 2 * (a + b);
  }
  return answer;
}

// 다른 풀이
const solution = (a, b) =>
  (a + b) % 2 ? (a + b) * 2 : a % 2 ? a * a + b * b : Math.abs(a - b);
