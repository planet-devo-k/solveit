class Solution {
    public int solution(int n, String control) {
        for(int i = 0; i < control.length(); i++){
            n += calc(control.charAt(i));
        }
        return n;
    }

    public int calc(char c) {
        return switch (c) {
            case 'w' -> 1;
            case 's' -> -1;
            case 'd' -> 10;
            case 'a' -> -10;
            default -> 0;
        };
    }
}