// RETRY
function solution(keymap, targets) {
  const minPresses = {};

  for (const key of keymap) {
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const pressCount = i + 1;
      if (minPresses[char] === undefined || minPresses[char] > pressCount) {
        minPresses[char] = pressCount;
      }
    }
  }

  const answer = [];

  for (const target of targets) {
    let totalPresses = 0;
    let possible = true;

    for (let i = 0; i < target.length; i++) {
      const char = target[i];
      if (minPresses[char] !== undefined) {
        totalPresses += minPresses[char];
      } else {
        possible = false;
        break;
      }
    }

    if (possible) {
      answer.push(totalPresses);
    } else {
      answer.push(-1);
    }
  }

  return answer;
}
