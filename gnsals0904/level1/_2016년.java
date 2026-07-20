class Solution {
    public String solution(int a, int b) {
        String[] days = {
                "FRI", "SAT", "SUN", "MON",
                "TUE", "WED", "THU"
        };

        int[] daysOfMonth = {
                31, 29, 31, 30, 31, 30,
                31, 31, 30, 31, 30, 31
        };

        int oneIdx = b - 1;

        for (int month = 0; month < a - 1; month++) {
            oneIdx += daysOfMonth[month];
        }

        return days[oneIdx % 7];
    }
}