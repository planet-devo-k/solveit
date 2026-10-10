function solution(schedules, timelogs, startday) {
  let answer = 0;

  for (let i = 0; i < schedules.length; i++) {
    const hour = Math.floor(schedules[i] / 100);
    const min = (schedules[i] % 100) + 10;
    const targetTime =
      min >= 60 ? (hour + 1) * 100 + (min - 60) : hour * 100 + min;

    let isEligible = true;

    for (let j = 0; j < 7; j++) {
      const currentDayOfWeek = ((startday + j - 1) % 7) + 1;
      if (currentDayOfWeek === 6 || currentDayOfWeek === 7) {
        continue;
      }

      if (timelogs[i][j] > targetTime) {
        isEligible = false;
        break;
      }
    }

    if (isEligible) {
      answer++;
    }
  }

  return answer;
}
