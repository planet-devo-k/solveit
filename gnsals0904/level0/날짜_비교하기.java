class Solution {
    public int solution(int[] date1, int[] date2) {
        int tempDate1 = dateToInt(date1[0], date1[1], date1[2]);
        int tempDate2 = dateToInt(date2[0], date2[1], date2[2]);
        return tempDate1 < tempDate2 ? 1 : 0;
    }
    
    public int dateToInt(int year, int month, int day){
        return year * 10000 + month * 100 + day;
    }
    
}

