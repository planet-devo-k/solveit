class Solution {
    static int[] numbers;
    static int[] three;
    static int answer;
    public int solution(int[] number) {
        three = new int[3];
        numbers = number;
        answer = 0;
        
        choice(0, 0);
        return answer;
    }
    
    void choice(int depth, int idx){
        if(depth == 3){
            if(canAnswer(three)) answer++;
            return;
        }
        for(int i = idx; i < numbers.length; i++){
            three[depth] = numbers[i];
            choice(depth + 1, i + 1);
        }
    }
    
    boolean canAnswer(int[] arr){
        if(arr[0] + arr[1] + arr[2] == 0){
            return true;
        }
        return false;
    }
}
