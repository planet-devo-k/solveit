function solution(board, moves) {
  let basket = [];
  let removeCount = 0;

  for (let m of moves) {
    let col = m - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] !== 0) {
        let doll = board[row][col];
        board[row][col] = 0;

        if (basket.length > 0 && basket[basket.length - 1] === doll) {
          basket.pop();
          removeCount += 2;
        } else {
          basket.push(doll);
        }

        break;
      }
    }
  }

  return removeCount;
}
