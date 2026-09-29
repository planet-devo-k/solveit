// https://school.programmers.co.kr/learn/courses/30/lessons/64061

function solution(board, moves) {
  const basket = [];
  let answer = 0;

  for (const move of moves) {
    const col = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] !== 0) {
        const doll = board[row][col];

        // 인형을 집었으므로 해당 칸 비우기
        board[row][col] = 0;

        // 바구니의 마지막 인형과 같으면 터뜨림
        if (basket[basket.length - 1] === doll) {
          basket.pop();
          answer += 2;
        } else {
          basket.push(doll);
        }

        // 한 번 집었으면 다음 move로
        break;
      }
    }
  }

  return answer;
}
