// https://school.programmers.co.kr/learn/courses/30/lessons/172928

const directions = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
};

// S 찾기
function findStartPosition(park) {
  const row = park.findIndex((row) => row.includes('S'));
  const col = park[row].indexOf('S');

  return [row, col];
}

// 이동 가능한 위치인지 확인
function canMove(park, row, col) {
  return (
    row >= 0 &&
    row < park.length &&
    col >= 0 &&
    col < park[0].length &&
    park[row][col] !== 'X'
  );
}

function solution(park, routes) {
  let [currentRow, currentCol] = findStartPosition(park);

  routes.forEach((route) => {
    const [direction, distance] = route.split(' ');
    const [rowMove, colMove] = directions[direction];

    let nextRow = currentRow;
    let nextCol = currentCol;
    let isValid = true;

    for (let i = 0; i < Number(distance); i++) {
      nextRow += rowMove;
      nextCol += colMove;

      if (!canMove(park, nextRow, nextCol)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      currentRow = nextRow;
      currentCol = nextCol;
    }
  });

  return [currentRow, currentCol];
}
