class Solution {
    static public boolean[][] graph;
    static public int row, col;
    static Point start;

    public int[] solution(String[] park, String[] routes) {
        row = park.length;
        col = park[0].length();

        makeGraph(park);

        for (String route : routes) {
            if (canMove(route)) {
                move(route);
            }
        }

        return new int[]{start.x, start.y};
    }

    public void move(String route) {
        char direction = route.charAt(0);
        int distance = route.charAt(2) - '0';

        Point dir = whichDir(direction, distance);

        start.x += dir.x;
        start.y += dir.y;
    }

    public boolean canMove(String route) {
        char direction = route.charAt(0);
        int distance = route.charAt(2) - '0';

        Point dir = whichDir(direction, 1);

        for (int i = 1; i <= distance; i++) {
            Point next = new Point(
                    start.x + dir.x * i,
                    start.y + dir.y * i
            );

            if (!isInPark(next)) {
                return false;
            }

            if (!graph[next.x][next.y]) {
                return false;
            }
        }

        return true;
    }

    public boolean isInPark(Point point) {
        return point.x >= 0
                && point.x < row
                && point.y >= 0
                && point.y < col;
    }

    public Point whichDir(char d, int p) {
        if (d == 'E') {
            return new Point(0, p);
        } else if (d == 'S') {
            return new Point(p, 0);
        } else if (d == 'N') {
            return new Point(-p, 0);
        } else {
            return new Point(0, -p);
        }
    }

    public void makeGraph(String[] park) {
        graph = new boolean[row][col];

        for (int j = 0; j < row; j++) {
            String p = park[j];

            for (int i = 0; i < col; i++) {
                if (p.charAt(i) == 'S') {
                    start = new Point(j, i);
                    graph[j][i] = true;
                } else if (p.charAt(i) == 'O') {
                    graph[j][i] = true;
                } else {
                    graph[j][i] = false;
                }
            }
        }
    }

    public static class Point {
        public int x, y;

        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}