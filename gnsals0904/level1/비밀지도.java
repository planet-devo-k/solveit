class Solution {
    static int size;
    public String[] solution(int n, int[] arr1, int[] arr2) {
        size = n;
        int[] resultArr = new int[n];
        String[] result = new String[n];
        for(int i = 0; i < n; i++){
            resultArr[i] = arr1[i] | arr2[i];
            result[i] = makeResult(resultArr[i]);
        }
        return result;
    }

    public String makeResult(int num){
        String result = Integer.toBinaryString(num);
        result = emptyReplaceZero(result);
        return numToHash(result);
    }

    public String emptyReplaceZero(String value){
        int sub = size - value.length();
        if(sub > 0){
            for(int i = 0; i < sub; i++){
                value = "0" + value;
            }
        }
        return value;
    }

    public String numToHash(String value){
        String result = "";
        for(int i = 0; i < size; i++){
            if(value.charAt(i) == '1'){
                result += "#";
            } else {
                result += " ";
            }
        }
        return result;
    }

}