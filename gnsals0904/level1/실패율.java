import java.util.*;

class Solution {
    public int[] solution(int N, int[] stages) {
        int[] count = new int[N + 2];

        for (int stage : stages) {
            count[stage]++;
        }

        double[] failureRate = new double[N + 1];

        int reached = stages.length;

        for (int stage = 1; stage <= N; stage++) {
            if (reached == 0) {
                failureRate[stage] = 0;
            } else {
                failureRate[stage] = (double) count[stage] / reached;
            }

            reached -= count[stage];
        }

        Integer[] stageNumbers = new Integer[N];

        for (int i = 0; i < N; i++) {
            stageNumbers[i] = i + 1;
        }

        Arrays.sort(stageNumbers, (a, b) -> {
            if (failureRate[a] == failureRate[b]) {
                return a - b;
            }

            return Double.compare(failureRate[b], failureRate[a]);
        });

        int[] answer = new int[N];

        for (int i = 0; i < N; i++) {
            answer[i] = stageNumbers[i];
        }

        return answer;
    }
}
