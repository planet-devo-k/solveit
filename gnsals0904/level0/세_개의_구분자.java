import java.util.*;

class Solution {
    public String[] solution(String myStr) {
        char[] myStrToChar = myStr.toCharArray();
        StringBuilder sb = new StringBuilder();
        ArrayList<String> answer = new ArrayList<>(1_000_000);
        for(char myChar : myStrToChar){
            if(isABC(myChar)){
                if(!sb.isEmpty()){
                    answer.add(sb.toString());
                    sb.setLength(0);
                }
                continue;
            }
            sb.append(myChar);
        }

        if (!sb.isEmpty()) {
            answer.add(sb.toString());
        }

        return answer.isEmpty()
                ? new String[]{"EMPTY"}
                : answer.toArray(String[]::new);
    }

    static public boolean isABC(char c){
        return (c == 'a' || c == 'b' || c == 'c');
    }
}