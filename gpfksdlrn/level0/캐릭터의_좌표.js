// https://school.programmers.co.kr/learn/courses/30/lessons/120861

function solution(keyinput, board) {
  let [x, y] = [0, 0];

  const maxX = Math.floor(board[0] / 2);
  const maxY = Math.floor(board[1] / 2);

  for (const key of keyinput) {
    switch (key) {
      case 'up':
        if (y < maxY) y++;
        break;

      case 'down':
        if (y > -maxY) y--;
        break;

      case 'left':
        if (x > -maxX) x--;
        break;

      case 'right':
        if (x < maxX) x++;
        break;
    }
  }

  return [x, y];
}
