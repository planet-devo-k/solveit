function solution(num) {
  let number = num;
  let breakCount = 0;
  let collatzCount = 0;

  while (true) {
    breakCount++;
    if (number === 1) return collatzCount;
    if (breakCount === 500) return -1;
    if (number % 2 === 0) {
      number = number / 2;
      collatzCount++;
    } else {
      number = number * 3 + 1;
      collatzCount++;
    }
  }
}
