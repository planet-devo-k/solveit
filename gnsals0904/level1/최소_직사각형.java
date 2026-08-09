import java.io.*;
import java.util.*;

class Solution {
    public int solution(int[][] sizes) {
        int width = 0;
        int length = 0;
        for(int[] size : sizes){
            width = Math.max(Math.max(size[0], size[1]), width);
            length = Math.max(Math.min(size[0], size[1]), length);
        }
        int answer = width * length;
        return answer;
    }
}