function solution(t, p) {
  let count = 0;
  for (let i = 0; i <= t.length - p.length; i++) {
    const sub = t.substring(i, i + p.length);

    if (BigInt(sub) <= BigInt(p)) {
      count++;
    }
  }
  return count;
}
