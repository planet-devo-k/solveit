function solution(date1, date2) {
  const [y1, m1, d1] = date1;
  const [y2, m2, d2] = date2;

  const value1 = y1 * 10000 + m1 * 100 + d1;
  const value2 = y2 * 10000 + m2 * 100 + d2;

  return value1 < value2 ? 1 : 0;
}
