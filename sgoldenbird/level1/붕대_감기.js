function solution(bandage, health, attacks) {
  const [t, x, y] = bandage;
  let currentHealth = health;
  let successCount = 0;

  const attackMap = new Map();
  for (const [time, damage] of attacks) {
    attackMap.set(time, damage);
  }

  const lastAttackTime = attacks[attacks.length - 1][0];

  for (let time = 1; time <= lastAttackTime; time++) {
    if (attackMap.has(time)) {
      const damage = attackMap.get(time);
      currentHealth -= damage;
      successCount = 0;

      if (currentHealth <= 0) {
        return -1;
      }
    } else {
      successCount++;
      currentHealth += x;

      if (successCount === t) {
        currentHealth += y;
        successCount = 0;
      }

      if (currentHealth > health) {
        currentHealth = health;
      }
    }
  }

  return currentHealth;
}
