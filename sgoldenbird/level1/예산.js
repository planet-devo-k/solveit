function solution(d, budget) {
  d.sort((a, b) => a - b);
  let affordable = 0;
  let count = 0;

  for (let i = 0; i < d.length; i++) {
    if (affordable + d[i] <= budget) {
      affordable += d[i];
      count++;
    } else {
      break;
    }
  }

  return count;
}
