import java.util.*;

class Solution {
    public int solution(int[][] board, int[] moves) {
        int answer = 0;

        Stack<Integer> basket = new Stack<>();

        for (int move : moves) {
            int col = move - 1;

            for (int row = 0; row < board.length; row++) {

                if (board[row][col] != 0) {
                    int doll = board[row][col];

                    board[row][col] = 0;

                    if (!basket.isEmpty() && basket.peek() == doll) {
                        basket.pop();
                        answer += 2;
                    } else {
                        basket.push(doll);
                    }

                    break;
                }
            }
        }

        return answer;
    }
}