import java.util.*;

class Solution {
    public String solution(String[] cards1, String[] cards2, String[] goal) {
        Queue<String> deck1 = new ArrayDeque<>(Arrays.asList(cards1));
        Queue<String> deck2 = new ArrayDeque<>(Arrays.asList(cards2));
        for (String g : goal) {
            if (g.equals(deck1.peek())) {
                deck1.poll();
            } else if (g.equals(deck2.peek())) {
                deck2.poll();
            } else {
                return "No";
            }
        }

        return "Yes";
    }
}