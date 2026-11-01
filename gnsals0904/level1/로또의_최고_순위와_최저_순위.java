class Solution {
    public int[] solution(int[] lottos, int[] win_nums) {
        int zeroCount = 0;
        int matchCount = 0;

        for (int lotto : lottos) {
            if (lotto == 0) {
                zeroCount++;
                continue;
            }

            for (int win : win_nums) {
                if (lotto == win) {
                    matchCount++;
                    break;
                }
            }
        }

        int maxRank = Math.min(7 - (matchCount + zeroCount), 6);
        int minRank = Math.min(7 - matchCount, 6);

        return new int[]{maxRank, minRank};
    }
}
