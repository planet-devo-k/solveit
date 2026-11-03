
class Solution {
    public int solution(int[] bandage, int health, int[][] attacks) {
        int maxHealth = health;
        int count = 0;
        int attackIndex = 0;

        for (int time = 1; time <= attacks[attacks.length - 1][0]; time++) {

            if (attackIndex < attacks.length && time == attacks[attackIndex][0]) {
                health -= attacks[attackIndex][1];
                count = 0;
                attackIndex++;

                if (health <= 0) {
                    return -1;
                }
            } 
            else {
                health = Math.min(maxHealth, health + bandage[1]);
                count++;

                if (count == bandage[0]) {
                    health = Math.min(maxHealth, health + bandage[2]);
                    count = 0;
                }
            }
        }

        return health;
    }
}

