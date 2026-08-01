class Solution {
    static int[] hashSort = new int[200001];
    public int solution(int[] nums) {
        for(int i : nums){
            hashSort[i]++;
        }
        int answer = 0;
        for(int i = 0; i < 200001; i++){
            if(hashSort[i] > 0){
                answer++;
            }
        }
        if(answer > nums.length/2) return nums.length/2;
        return answer;
    }
}