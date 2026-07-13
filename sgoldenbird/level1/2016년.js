function solution(a, b) {
  const month = a;
  const day = b;
  const days = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  const monthDays = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let totalDays = 0;
  for (let i = 1; i < month; i++) {
    totalDays += monthDays[i];
  }

  totalDays += day - 1;

  return days[totalDays % 7];
}
