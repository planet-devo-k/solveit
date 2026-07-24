function solution(a, b) {
  const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 1월 1일이 금요일부터 시작
  // 총 일수를 7로 나눴을 때 나머지가 1이면 금요일(FRI)이 되도록 설정
  const days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];

  // 1월부터 (a-1)월까지의 모든 일수를 더함
  let totalDays = 0;
  for (let i = 0; i < a - 1; i++) {
    totalDays += months[i];
  }

  // 이번 달의 일수를 더함
  totalDays += b;

  // 7로 나눈 나머지를 인덱스로 사용해 요일 반환
  return days[totalDays % 7];
}

// 다른 풀이
// function getDayName(a, b) {
//   return new Date(2016, a - 1, b).toString().slice(0, 3).toUpperCase();
// }
