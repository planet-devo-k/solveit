import java.util.*;

class Solution {
    static Map<String, Integer> score = new HashMap<>();
    public int[] solution(String[] name, int[] yearning, String[][] photo) {
        for (int i = 0; i < name.length; i++) {
            score.put(name[i], yearning[i]);
        }
        
        int[] answer = new int[photo.length];
        
        for (int i = 0; i < photo.length; i++) {
            int s = 0;

            for (String person : photo[i]) {
                if (score.containsKey(person)) {
                    s += score.get(person);
                }
            }
            answer[i] = s;
        }
        return answer;
    }
}
