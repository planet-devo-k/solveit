// https://school.programmers.co.kr/learn/courses/30/lessons/42862

function solution(n, lost, reserve) {
  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);

  // 여벌이 있지만 도난당한 학생 처리
  for (const student of lost) {
    if (reserveSet.has(student)) {
      lostSet.delete(student);
      reserveSet.delete(student);
    }
  }

  // 번호순으로 처리
  const sortedLost = [...lostSet].sort((a, b) => a - b);

  for (const student of sortedLost) {
    if (reserveSet.has(student - 1)) {
      reserveSet.delete(student - 1);
      lostSet.delete(student);
    } else if (reserveSet.has(student + 1)) {
      reserveSet.delete(student + 1);
      lostSet.delete(student);
    }
  }

  return n - lostSet.size;
}
