class Solution {
    public int[] solution(int n, int m) {
        int gcd = gcd(n, m);
        int lcm = n / gcd * m;

        return new int[]{gcd, lcm};
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }

        return a;
    }
}