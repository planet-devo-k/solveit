// RETRY
function solution(n, m, section) {
  let count = 0;
  let paintedEnd = 0;

  for (const s of section) {
    if (s > paintedEnd) {
      count++;
      paintedEnd = s + m - 1;
    }
  }

  return count;
}
