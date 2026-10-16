import java.io.*;
import java.util.*;

class Solution {
    static HashMap<String, Integer> runners = new HashMap();
    public String solution(String[] participant, String[] completion) {
        for(String nowP : participant){
            if(!runners.containsKey(nowP)){
                runners.put(nowP, 1);
            } else {
                runners.put(nowP, runners.get(nowP) + 1);
            }
        }
        for(String nowP : completion){
            runners.put(nowP, runners.get(nowP) - 1);
        }
        for(String strKey : runners.keySet()){
            int value = runners.get(strKey);
            if(value != 0){
                return strKey;
            }
        }
        return "error";
    }
}
