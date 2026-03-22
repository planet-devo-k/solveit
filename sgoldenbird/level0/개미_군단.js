function solution(hp) {
  const general = 5;
  const soldier = 3;
  const worker = 1;

  const generalCount = Math.floor(hp / general);
  const soldierCount = Math.floor((hp % general) / soldier);
  const workerCount = ((hp % general) % soldier) / worker;

  return generalCount + soldierCount + workerCount;
}
