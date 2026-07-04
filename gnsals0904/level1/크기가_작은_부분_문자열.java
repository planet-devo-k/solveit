import java.util.*;

class Solution {
    public int solution(String t, String p) {
        int answer = 0;
        long pNum = Long.parseLong(p);
        int ansLen = calcAnsLen(t.length(), p.length());
        for(int cnt = 0; cnt < ansLen; cnt++){
            long ansCandid = Long.parseLong(t.substring(cnt, cnt + p.length()));
            if(ansCandid <= pNum) answer++;
        }
        return answer;
    }

    static int calcAnsLen(int tLen, int pLen){
        return tLen - pLen + 1;
    }
}