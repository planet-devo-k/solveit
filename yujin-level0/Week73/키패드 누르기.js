function solution(numbers, hand) {
  // 1. 키패드 각 번호의 (행, 열) 좌표 매핑
  const pad = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    "*": [3, 0],
    0: [3, 1],
    "#": [3, 2],
  };

  let left = pad["*"]; // 왼손 초기 위치
  let right = pad["#"]; // 오른손 초기 위치
  let result = "";

  for (const num of numbers) {
    // 무조건 왼손
    if (num === 1 || num === 4 || num === 7) {
      result += "L";
      left = pad[num];
    }
    // 무조건 오른손
    else if (num === 3 || num === 6 || num === 9) {
      result += "R";
      right = pad[num];
    }
    // 가운데 열 (2, 5, 8, 0)
    else {
      const target = pad[num];

      // 맨해튼 거리 계산
      const leftDist =
        Math.abs(left[0] - target[0]) + Math.abs(left[1] - target[1]);
      const rightDist =
        Math.abs(right[0] - target[0]) + Math.abs(right[1] - target[1]);

      if (leftDist < rightDist) {
        result += "L";
        left = target;
      } else if (rightDist < leftDist) {
        result += "R";
        right = target;
      } else {
        // 거리가 같으면 주손 선택
        if (hand === "left") {
          result += "L";
          left = target;
        } else {
          result += "R";
          right = target;
        }
      }
    }
  }

  return result;
}
