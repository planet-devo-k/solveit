// https://school.programmers.co.kr/learn/courses/30/lessons/250137

function solution(bandage, health, attacks) {
  const [t, x, y] = bandage;

  let currentHealth = health;
  let success = 0;
  let attackIndex = 0;

  // 마지막 공격 시간까지 반복
  for (let time = 1; time <= attacks[attacks.length - 1][0]; time++) {
    // 현재 시간에 공격이 있는 경우
    if (attacks[attackIndex][0] === time) {
      currentHealth -= attacks[attackIndex][1];

      success = 0;
      attackIndex++;

      if (currentHealth <= 0) return -1;
    } else {
      // 기본 회복
      currentHealth += x;
      success++;

      // 연속 성공 시간이 t초에 도달하면 추가 회복
      if (success === t) {
        currentHealth += y;
        success = 0;
      }

      // 최대 체력을 초과하지 않도록 제한
      currentHealth = Math.min(currentHealth, health);
    }
  }

  return currentHealth;
}
