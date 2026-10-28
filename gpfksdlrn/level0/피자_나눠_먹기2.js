// https://school.programmers.co.kr/learn/courses/30/lessons/120815

function solution(n) {
  let pizza = 1;

  while ((pizza * 6) % n !== 0) {
    pizza++;
  }

  return pizza;
}
