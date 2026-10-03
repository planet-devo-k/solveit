import java.util.*;

class Solution {
    public int[] solution(int[] arr) {
        ArrayList<Integer> answer = new ArrayList<>();

        for (int a : arr) {
            if (a % 2 == 0 && a >= 50) {
                answer.add(a/2);
            } else if(a % 2 == 1 && a < 50) answer.add(a*2);
            else answer.add(a);
        }

        return answer.stream()
                .mapToInt(Integer::intValue)
                .toArray();
    }
}