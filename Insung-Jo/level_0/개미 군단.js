function solution(hp) {
  const ARCHER_ANT = 5;
  const SOLDIER_ANT = 3;
  const WORKER_ANT = 1;
  const DEAD = 0;

  let prey = hp;
  let answer = 0;

  while (prey > DEAD) {
    if (prey >= ARCHER_ANT) {
      prey -= ARCHER_ANT;
      answer++;
    } else if (prey >= SOLDIER_ANT) {
      prey -= SOLDIER_ANT;
      answer++;
    } else {
      prey -= WORKER_ANT;
      answer++;
    }
  }

  return answer;
}
