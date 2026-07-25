function solution(keymap, targets) {
  const minPressMap = new Map();

  for (const key of keymap) {
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const count = i + 1;

      if (!minPressMap.has(char) || count < minPressMap.get(char)) {
        minPressMap.set(char, count);
      }
    }
  }

  return targets.map((target) => {
    let sum = 0;

    for (const char of target) {
      if (!minPressMap.has(char)) return -1;
      sum += minPressMap.get(char);
    }

    return sum;
  });
}
