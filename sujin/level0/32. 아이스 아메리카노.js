function solution(money) {
  const AMERICANO = 5500;
  const cups = Math.floor(money / AMERICANO);
  const changes = money - cups * AMERICANO;
  return [cups, changes];
}
