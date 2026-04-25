function solution(n) {
  return Array(n)
    .fill()
    .map((_, i) => {
      let row = Array(n).fill(0);
      row[i] = 1; // 대각선 위치(i번째)만 1로 바꿈
      return row;
    });
}
