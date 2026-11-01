class Solution {
    public String solution(String X, String Y) {
        int[] xCount = new int[10];
        int[] yCount = new int[10];

        for (int i = 0; i < X.length(); i++) {
            xCount[X.charAt(i) - '0']++;
        }

        for (int i = 0; i < Y.length(); i++) {
            yCount[Y.charAt(i) - '0']++;
        }

        StringBuilder answer = new StringBuilder();

        for (int i = 9; i >= 0; i--) {
            int count = Math.min(xCount[i], yCount[i]);

            for (int j = 0; j < count; j++) {
                answer.append(i);
            }
        }

        if (answer.length() == 0) {
            return "-1";
        }

        if (answer.charAt(0) == '0') {
            return "0";
        }

        return answer.toString();
    }
}
