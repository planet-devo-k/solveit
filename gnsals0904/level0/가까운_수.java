import java.util.*;

class Solution {
    public int solution(int[] array, int n) {
        Arrays.sort(array);
        int minDiff = 100;
        int answer = array[0];
        for(int i = 0; i < array.length; i++){
            int nowDiff = Math.abs(array[i] - n);
            if(array[i] == n) return n;
            if(nowDiff < minDiff){
                answer = array[i];
                minDiff = Math.min(nowDiff, minDiff);
            }
        }
        return answer;
    }
}