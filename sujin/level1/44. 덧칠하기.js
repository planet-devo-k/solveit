function solution(n, m, section) {
  let count = 0;
  let coveredUntil = 0;

  for (const s of section) {
    if (s > coveredUntil) {
      count++;
      coveredUntil = s + m - 1;
    }
  }

  return count;
}
