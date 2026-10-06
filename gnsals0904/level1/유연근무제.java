class Solution {
    public int solution(int[] schedules, int[][] timelogs, int startday) {
        int answer = 0;

        for (int i = 0; i < schedules.length; i++) {
            int hour = schedules[i] / 100;
            int minute = schedules[i] % 100 + 10;

            if (minute >= 60) {
                hour++;
                minute -= 60;
            }

            int limitTime = hour * 100 + minute;

            boolean success = true;

            for (int j = 0; j < 7; j++) {
                int day = (startday + j - 1) % 7 + 1;

                if (day == 6 || day == 7) {
                    continue;
                }

                if (timelogs[i][j] > limitTime) {
                    success = false;
                    break;
                }
            }

            if (success) {
                answer++;
            }
        }

        return answer;
    }
}