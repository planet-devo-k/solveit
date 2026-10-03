// 출근 인정 시각 계산 함수
function getLimitTime(time) {
  let hour = Math.floor(time / 100);
  let minute = time % 100;

  minute += 10;

  if (minute >= 60) {
    hour += 1;
    minute -= 60;
  }

  return hour * 100 + minute;
}

// 한 직원의 일주일 출근 조건 확인
function isOnTime(timelog, limit, startday) {
  for (let j = 0; j < 7; j++) {
    const day = ((startday + j - 1) % 7) + 1;

    // 주말은 검사하지 않음
    if (day === 6 || day === 7) {
      continue;
    }

    // 지각하면 탈락
    if (timelog[j] > limit) {
      return false;
    }
  }

  return true;
}

function solution(schedules, timelogs, startday) {
  // 직원별 출근 희망 시각에 10분을 더한 인정 시각 계산
  const limits = schedules.map(getLimitTime);

  let count = 0;

  // 각 직원이 평일에 지각하지 않았는지 확인
  for (let i = 0; i < timelogs.length; i++) {
    if (isOnTime(timelogs[i], limits[i], startday)) {
      count++;
    }
  }

  return count;
}
