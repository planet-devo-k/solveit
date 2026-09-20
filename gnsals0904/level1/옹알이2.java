class Solution {
    public int solution(String[] babbling) {
        int answer = 0;

        String[] words = {"aya", "ye", "woo", "ma"};

        for (String str : babbling) {
            int index = 0;
            String prev = "";
            boolean possible = true;

            while (index < str.length()) {
                boolean found = false;

                for (String word : words) {
                    if (str.startsWith(word, index) && !word.equals(prev)) {
                        index += word.length();
                        prev = word;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    possible = false;
                    break;
                }
            }

            if (possible) {
                answer++;
            }
        }

        return answer;
    }
}
