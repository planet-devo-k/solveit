function solution(keymap, targets) {
  const minClicks = {};

  for (const key of keymap) {
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const clicks = i + 1;

      if (!minClicks[char] || minClicks[char] > clicks) {
        minClicks[char] = clicks;
      }
    }
  }

  return targets.map((target) => {
    let total = 0;

    for (const char of target) {
      if (!minClicks[char]) {
        return -1;
      }
      total += minClicks[char];
    }

    return total;
  });
}
