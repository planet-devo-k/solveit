// https://school.programmers.co.kr/learn/courses/30/lessons/181927

function solution(num_list) {
  const [prev, last] = num_list.slice(-2);
  const num = last > prev ? last - prev : last * 2;
  return [...num_list, num];
}
