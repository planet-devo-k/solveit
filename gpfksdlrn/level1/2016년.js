// https://school.programmers.co.kr/learn/courses/30/lessons/12901

function solution(a, b) {
  const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekDays = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];

  let totalDays = b;

  for (let i = 0; i < a - 1; i++) {
    totalDays += monthDays[i];
  }

  return weekDays[(totalDays - 1) % 7];
}
