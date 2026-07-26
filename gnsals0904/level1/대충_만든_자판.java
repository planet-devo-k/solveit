import java.util.*;

class Solution {
    int[] minCntAlpha = new int[26];
    int maxLengthKey = 0;

    public int[] solution(String[] keymap, String[] targets) {
        Arrays.fill(minCntAlpha, 0);

        for (int i = 0; i < keymap.length; i++) {
            maxLengthKey = Math.max(maxLengthKey, keymap[i].length());
        }

        for (int i = 0; i < maxLengthKey; i++) {
            for (int j = 0; j < keymap.length; j++) {
                if (keymap[j].length() <= i) {
                    continue;
                }

                int nowKey = keymap[j].charAt(i) - 'A';
                if (minCntAlpha[nowKey] == 0) {
                    minCntAlpha[nowKey] = i + 1;
                }
            }
        }

        int[] answer = new int[targets.length];

        for (int j = 0; j < targets.length; j++) {
            String target = targets[j];
            int result = 0;

            for (int i = 0; i < target.length(); i++) {
                int minCnt = minCntAlpha[target.charAt(i) - 'A'];
                if (minCnt == 0) {
                    result = -1;
                    break;
                }
                result += minCnt;
            }

            answer[j] = result;
        }
        return answer;
    }
}
