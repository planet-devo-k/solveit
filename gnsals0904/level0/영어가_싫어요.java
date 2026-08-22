class Solution {
    public long solution(String numbers) {
        long answer = 0;

        for (int i = 0; i < numbers.length();) {
            char first = numbers.charAt(i);
            char second = numbers.charAt(i + 1);

            ParseNum parsed = parseNum(first, second);

            answer = answer * 10 + parsed.num;

            i += parsed.wordLength;
        }

        return answer;
    }

    public ParseNum parseNum(char first, char second) {
        return switch (first) {
            case 'z' -> new ParseNum(0, 4);
            case 'o' -> new ParseNum(1, 3);

            case 't' -> second == 'w'
                    ? new ParseNum(2, 3)
                    : new ParseNum(3, 5);

            case 'f' -> second == 'o'
                    ? new ParseNum(4, 4)
                    : new ParseNum(5, 4);

            case 's' -> second == 'i'
                    ? new ParseNum(6, 3)
                    : new ParseNum(7, 5);

            case 'e' -> new ParseNum(8, 5);
            case 'n' -> new ParseNum(9, 4);
                
            default -> new ParseNum(-1, -1);
        };
    }

    public class ParseNum {
        int num;
        int wordLength;

        ParseNum(int num, int wordLength) {
            this.num = num;
            this.wordLength = wordLength;
        }
    }
}
