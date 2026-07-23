class Solution {
    public int solution(int n, int m, int[] section) {
        int answer = 0;
        int paintedEnd = 0;

        for (int posi : section) {
            if (posi <= paintedEnd) {
                continue;
            }

            answer++;

            int start = Math.min(posi, n - m + 1);
            paintedEnd = start + m - 1;
        }

        return answer;
    }
}
