class Solution {
    public int solution(int a, int b, int n) {
        return returnCoke(n, b, a);
    }

    static int returnCoke(int empty, int returnCoke, int baseLine){
        if(empty < baseLine){
            return 0;
        }

        int received = empty / baseLine * returnCoke;
        int remained = empty % baseLine;
        int nextEmpty = remained + received;

        return received + returnCoke(nextEmpty, returnCoke, baseLine);
    }
}