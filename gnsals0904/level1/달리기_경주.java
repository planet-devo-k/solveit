import java.util.*;

class Solution {
    public String[] solution(String[] players, String[] callings) {
        Map<String, Integer> rankMap = new HashMap<>();

        for (int i = 0; i < players.length; i++) {
            rankMap.put(players[i], i);
        }

        for (String called : callings) {
            int currentRank = rankMap.get(called);
            int frontRank = currentRank - 1;

            String frontPlayer = players[frontRank];

            players[frontRank] = called;
            players[currentRank] = frontPlayer;

            rankMap.put(called, frontRank);
            rankMap.put(frontPlayer, currentRank);
        }

        return players;
    }
}
