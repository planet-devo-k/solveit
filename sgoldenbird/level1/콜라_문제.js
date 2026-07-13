function solution(a, b, n) {
  let answer = 0;
  let currentBottles = n;

  while (currentBottles >= a) {
    let newCola = Math.floor(currentBottles / a) * b;
    currentBottles = newCola + (currentBottles % a);
    answer += newCola;
  }
  return answer;
}
