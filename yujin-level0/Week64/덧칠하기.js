function solution(n, m, section) {
  let count = 0;
  let paintedUntil = 0; // 롤러가 덮은 마지막 구역 번호

  for (let s of section) {
    // 현재 칠해야 할 구역이 아직 칠해지지 않은 위치라면
    if (s > paintedUntil) {
      count++;
      paintedUntil = s + m - 1;
    }
  }

  return count;
}
