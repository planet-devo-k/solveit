import java.util.*;

class Solution {
    static Map<String, String> database = new HashMap<>();
    public String solution(String[] id_pw, String[][] db) {
        for(String[] d : db){
            database.put(d[0], d[1]);
        }
        return login(id_pw[0], id_pw[1]);
    }
    
    String login(String id, String pw){
        if(database.containsKey(id)){
            if(pw.equals(database.get(id))) return "login";
            return "wrong pw";
        }
        return "fail";
    }
    
    
}
