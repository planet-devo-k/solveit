class Solution {
    public String solution(String[] survey, int[] choices) {
        int[] scores = new int[26];

        for (int i = 0; i < survey.length; i++) {
            char disagree = survey[i].charAt(0);
            char agree = survey[i].charAt(1);

            if (choices[i] < 4) {
                scores[disagree - 'A'] += 4 - choices[i];
            } else if (choices[i] > 4) {
                scores[agree - 'A'] += choices[i] - 4;
            }
        }

        StringBuilder answer = new StringBuilder();
        String[] types = {"RT", "CF", "JM", "AN"};

        for (String type : types) {
            char first = type.charAt(0);
            char second = type.charAt(1);

            if (scores[first - 'A'] >= scores[second - 'A']) {
                answer.append(first);
            } else {
                answer.append(second);
            }
        }

        return answer.toString();
    }
}
