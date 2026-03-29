/*2022년 기준 선생님의 나이 age가 주어질 때, 선생님의 출생 연도를 return 하는 solution 함수를 완성해주세요*/
function solution(age) {
  const DEFAULT_YEAR = 2022;
  const currentAge = Math.floor(age);
  const result = DEFAULT_YEAR - currentAge + 1;

  if (isNaN(result)) return;

  return result;
}
