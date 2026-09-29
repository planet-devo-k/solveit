// https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
  const position = [
    [3, 1], // 0
    [0, 0], // 1
    [0, 1], // 2
    [0, 2], // 3
    [1, 0], // 4
    [1, 1], // 5
    [1, 2], // 6
    [2, 0], // 7
    [2, 1], // 8
    [2, 2], // 9
  ];

  let left = [3, 0]; // *
  let right = [3, 2]; // #

  let result = '';

  for (const number of numbers) {
    if ([1, 4, 7].includes(number)) {
      result += 'L';
      left = position[number];
    } else if ([3, 6, 9].includes(number)) {
      result += 'R';
      right = position[number];
    } else {
      const [r, c] = position[number];

      const leftDistance = Math.abs(left[0] - r) + Math.abs(left[1] - c);

      const rightDistance = Math.abs(right[0] - r) + Math.abs(right[1] - c);

      if (leftDistance < rightDistance) {
        result += 'L';
        left = position[number];
      } else if (rightDistance < leftDistance) {
        result += 'R';
        right = position[number];
      } else {
        if (hand === 'left') {
          result += 'L';
          left = position[number];
        } else {
          result += 'R';
          right = position[number];
        }
      }
    }
  }

  return result;
}
