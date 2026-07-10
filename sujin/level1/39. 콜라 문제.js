function solution(a, b, n) {
  let total = 0;
  let bottles = n;

  while (bottles >= a) {
    const received = Math.floor(bottles / a) * b;
    const remainder = bottles % a;
    total += received;
    bottles = received + remainder;
  }

  return total;
}
