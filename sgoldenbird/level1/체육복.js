function solution(n, lost, reserve) {
  const actualLost = lost
    .filter((x) => !reserve.includes(x))
    .sort((a, b) => a - b);
  const actualReserve = reserve
    .filter((x) => !lost.includes(x))
    .sort((a, b) => a - b);

  for (const r of actualReserve) {
    const idx = actualLost.findIndex((l) => Math.abs(l - r) === 1);
    if (idx !== -1) actualLost.splice(idx, 1);
  }

  return n - actualLost.length;
}
