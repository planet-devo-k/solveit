import java.util.*;

class Solution {
    public int[] solution(int k, int[] score) {
        int[] answer = new int[score.length];
        ArrayList<Integer> hall = new ArrayList<>();

        for (int i = 0; i < score.length; i++) {
            hall.add(score[i]);

            Collections.sort(hall);

            if (hall.size() > k) {
                hall.remove(0);
            }

            answer[i] = hall.get(0);
        }

        return answer;
    }
}
