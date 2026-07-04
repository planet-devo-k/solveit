import java.util.*;

class Solution {
    static int[] mem = new int[31];
    public int solution(int[] num_list) {
        Arrays.fill(mem, -1);
        mem[1] = 0;
        int answer = 0;

        for(int num : num_list){
            if(mem[num] != -1) {
                answer += mem[num];
                continue;
            };

            int count = 0;
            int originNum = num;
            while(num != 1){
                num = num / 2;
                count++;
                if(mem[num] != -1){
                    count += mem[num];
                    break;
                }
            }
            answer += count;
            mem[originNum] = count;
        }
        return answer;
    }
}