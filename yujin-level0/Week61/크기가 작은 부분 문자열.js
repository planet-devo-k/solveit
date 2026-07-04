function solution(t, p) {
  let count = 0;

  for (let i = 0; i <= t.length - p.length; i++) {
    const subStr = t.slice(i, i + p.length);

    if (Number(subStr) <= +p) {
      count++;
    }
  }

  return count;
}
