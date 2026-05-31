function solution(n) {
  let str = "";

  while (n > 0) {
    str += n % 3;
    n = Math.floor(n / 3);
  }

  return parseInt(str, 3);
}

// 다른 풀이
// function solution(n) {
//     const reversedBase3 = n.toString(3).split('').reverse().join('');

//     return parseInt(reversedBase3, 3);
// }
