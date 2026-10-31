function solution(n, w, num) {
  let count = 0;
  let current = num;

  while (current <= n) {
    count++;
    const currentLayer = Math.floor((current - 1) / w);
    const col =
      currentLayer % 2 === 0 ? (current - 1) % w : w - 1 - ((current - 1) % w);
    const nextLayer = currentLayer + 1;

    current =
      nextLayer % 2 === 0 ? nextLayer * w + 1 + col : nextLayer * w + (w - col);
  }

  return count;
}
