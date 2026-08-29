class Solution {
    static int garo, sero;
    public int[] solution(String[] keyinput, int[] board) {
        garo = board[0]/2;
        sero = board[1]/2;
        Point p = new Point(0, 0);
        for(String key : keyinput){
            p.move(key);
        }
        int[] result = new int[2];
        result[0] = p.x;
        result[1] = p.y;
        return result;
    }
    
    class Point{
        int x;
        int y;
        
        Point(int x, int y){
            this.x = x;
            this.y = y;
        }
        
        void move(String dir){
            if(dir.equals("left")){
                x--;
            } else if(dir.equals("right")){
                x++;
            } else if(dir.equals("up")){
                y++;
            } else if(dir.equals("down")){
                y--;
            }
            if(x < garo*-1) x = garo*-1;
            if(x > garo) x = garo;
            if(y < sero*-1) y = sero*-1;
            if(y > sero) y = sero;
        }
    }
    
    
}
