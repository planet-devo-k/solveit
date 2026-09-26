function solution(numbers, hand) {
  const keypad = {
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

  let leftPos = keypad["*"];
  let rightPos = keypad["#"];

  return numbers
    .map((n) => {
      if (n % 3 === 1) {
        leftPos = keypad[n];
        return "L";
      }
      if (n % 3 === 0 && n !== 0) {
        rightPos = keypad[n];
        return "R";
      }

      const target = keypad[n];
      const distL =
        Math.abs(leftPos[0] - target[0]) + Math.abs(leftPos[1] - target[1]);
      const distR =
        Math.abs(rightPos[0] - target[0]) + Math.abs(rightPos[1] - target[1]);

      if (distL !== distR) {
        return distL < distR
          ? ((leftPos = target), "L")
          : ((rightPos = target), "R");
      }

      return hand === "right"
        ? ((rightPos = target), "R")
        : ((leftPos = target), "L");
    })
    .join("");
}
