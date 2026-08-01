function solution(keymap, targets) {
  const minPressMap = new Map();

  // 각 문자를 입력하기 위한 최소 누름 횟수를 Map에 계산하여 저장
  for (const key of keymap) {
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const pressCount = i + 1; // 인덱스는 0부터 시작하므로 +1

      if (!minPressMap.has(char)) {
        minPressMap.set(char, pressCount);
      } else {
        minPressMap.set(char, Math.min(minPressMap.get(char), pressCount));
      }
    }
  }

  // targets의 각 문자열을 만들기 위한 최소 횟수 계산
  const answer = targets.map((target) => {
    let totalPresses = 0;

    for (const char of target) {
      // 자판으로 입력할 수 없는 문자가 포함된 경우 -1 반환
      if (!minPressMap.has(char)) {
        return -1;
      }
      totalPresses += minPressMap.get(char);
    }

    return totalPresses;
  });

  return answer;
}
