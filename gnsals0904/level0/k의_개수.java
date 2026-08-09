class Solution {
    public int solution(int i, int j, int k) {
        StringBuilder sb = new StringBuilder();
        for(int num = i; num <= j; num++){
            sb.append(num);
        }
        int ans = 0;

        for (int idx = 0; idx < sb.length(); idx++) {
            char n = sb.charAt(idx);
            if (n - '0' == k) {
                ans++;
            }
        }
        return ans;
    }
}