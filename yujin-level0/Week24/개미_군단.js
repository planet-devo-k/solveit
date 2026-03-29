function solution(hp) {
  const first = Math.floor(hp / 5);
  const second = Math.floor((hp - first * 5) / 3);
  const third = hp - first * 5 - second * 3;
  return first + second + third;
}

// 다른 풀이
// function solution(hp) {
//     return Math.floor(hp/5)+Math.floor((hp%5)/3)+(hp%5)%3;
// }
