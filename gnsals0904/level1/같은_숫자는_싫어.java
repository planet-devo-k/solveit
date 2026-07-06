import java.util.*;

public class Solution {
    public int[] solution(int []arr) {
        int prev = -1;
        ArrayList<Integer> answers = new ArrayList<>(1_000_000);
        for(int a : arr){
            if(prev != a) answers.add(a);
            prev = a;
        }
        return answers.stream()
                .mapToInt(Integer::intValue)
                .toArray();
    }
}