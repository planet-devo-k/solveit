import java.util.*;

class Solution {
    static int[] clothes;

    public int solution(int n, int[] lost, int[] reserve) {
        clothes = new int[n + 1];
        Arrays.fill(clothes, 1);

        for(int i : lost){
            clothes[i] = 0;
        }

        for(int i : reserve){
            if(clothes[i] == 1) {
                clothes[i] = 2;
            }
            else if(clothes[i] == 0) {
                clothes[i] = 1;
            }
        }

        for(int i = 1; i <= n; i++){
            if(clothes[i] == 2){
                if(i > 1 && clothes[i - 1] == 0){
                    clothes[i - 1] = 1;
                    clothes[i] = 1;
                }
                else if(i < n && clothes[i + 1] == 0){
                    clothes[i + 1] = 1;
                    clothes[i] = 1;
                }
            }
        }

        int answer = 0;

        for(int i = 1; i <= n; i++){
            if(clothes[i] >= 1) {
                answer++;
            }
        }

        return answer;
    }
}
