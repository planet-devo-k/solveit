// https://school.programmers.co.kr/learn/courses/30/lessons/82612

function solution(price, money, count) {
  const totalCost = price * ((count * (count + 1)) / 2);
  return Math.max(0, totalCost - money);
}
