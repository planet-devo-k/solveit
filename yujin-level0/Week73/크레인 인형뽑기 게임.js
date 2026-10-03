function solution(board, moves) {
    const stack = [];
    let poppedCount = 0;

    for (const move of moves) {
        const col = move - 1; // 1-indexed -> 0-indexed 변환

        // 위에서부터 아래로 집을 인형 찾기
        for (let row = 0; row < board.length; row++) {
            if (board[row][col] !== 0) {
                const doll = board[row][col];
                board[row][col] = 0; // 인형을 집었으므로 빈칸으로 만듦

                // 바구니(스택) 맨 위 인형과 같은지 확인
                if (stack.length > 0 && stack[stack.length - 1] === doll) {
                    stack.pop(); // 같으면 기존 인형 터뜨림
                    poppedCount += 2; // 터진 인형은 2개
                } else {
                    stack.push(doll); // 다르면 바구니에 담음
                }

                break; // 인형을 하나 집었으므로 다음 move로 이동
            }
        }
    }

    return poppedCount;
}