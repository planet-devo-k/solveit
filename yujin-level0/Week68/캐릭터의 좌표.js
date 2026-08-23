function solution(keyinput, board) {
  // 현재 좌표 초기화 (루프 바깥에 선언)
  let x = 0;
  let y = 0;

  // 보드 크기에 따른 최대 이동 가능 범위 계산 (절댓값 기준)
  const maxX = Math.floor(board[0] / 2);
  const maxY = Math.floor(board[1] / 2);

  // 방향키 입력 순회
  for (let dir of keyinput) {
    if (dir === "left" && x > -maxX) {
      x -= 1;
    } else if (dir === "right" && x < maxX) {
      x += 1;
    } else if (dir === "up" && y < maxY) {
      y += 1;
    } else if (dir === "down" && y > -maxY) {
      y -= 1;
    }
  }

  // 최종 좌표 [x, y] 반환
  return [x, y];
}

// 다른 풀이
function solution(keyinput, board) {
  let res = [0, 0];

  const maxX = Math.floor(board[0] / 2);
  const maxY = Math.floor(board[1] / 2);
  for (let p of keyinput) {
    switch (p) {
      case "left":
        if (-res[0] < maxX) res[0]--;
        break;
      case "right":
        if (res[0] < maxX) res[0]++;
        break;
      case "up":
        if (res[1] < maxY) res[1]++;
        break;
      case "down":
        if (-res[1] < maxY) res[1]--;
        break;
    }
  }
  return res;
}
