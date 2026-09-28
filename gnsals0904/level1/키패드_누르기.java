class Solution {
    public String solution(int[] numbers, String hand) {
        StringBuilder answer = new StringBuilder();

        int left = 10;
        int right = 12;

        for (int number : numbers) {
            if (number == 1 || number == 4 || number == 7) {
                answer.append("L");
                left = number;
            }

            else if (number == 3 || number == 6 || number == 9) {
                answer.append("R");
                right = number;
            }

            else {
                int target = number == 0 ? 11 : number;
                int leftDistance = getDistance(left, target);
                int rightDistance = getDistance(right, target);

                if (leftDistance < rightDistance) {
                    answer.append("L");
                    left = target;
                } else if (rightDistance < leftDistance) {
                    answer.append("R");
                    right = target;
                } else {
                    if (hand.equals("left")) {
                        answer.append("L");
                        left = target;
                    } else {
                        answer.append("R");
                        right = target;
                    }
                }
            }
        }

        return answer.toString();
    }

    private int getDistance(int from, int to) {
        int fromRow = (from - 1) / 3;
        int fromCol = (from - 1) % 3;

        int toRow = (to - 1) / 3;
        int toCol = (to - 1) % 3;

        return Math.abs(fromRow - toRow)
                + Math.abs(fromCol - toCol);
    }
}