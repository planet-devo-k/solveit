import java.util.*;

class Solution {
    public int[] solution(String[] id_list, String[] report, int k) {
        int[] answer = new int[id_list.length];

        Map<String, Set<String>> reportMap = new HashMap<>();

        for (String id : id_list) {
            reportMap.put(id, new HashSet<>());
        }

        for (String r : report) {
            String[] users = r.split(" ");

            String reporter = users[0];
            String reported = users[1];

            reportMap.get(reported).add(reporter);
        }

        for (int i = 0; i < id_list.length; i++) {
            String id = id_list[i];

            for (String reported : reportMap.keySet()) {
                if (reportMap.get(reported).size() >= k
                    && reportMap.get(reported).contains(id)) {
                    answer[i]++;
                }
            }
        }

        return answer;
    }
}
