function solution(n, m) {
  let a = n;
  let b = m;

  // 나머지가 0이 될 때까지 반복
  while (b !== 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }

  const gcd = a;
  const lcm = (n * m) / gcd;

  return [gcd, lcm];
}

// 다른 풀이
// function gcdlcm(a, b) {
//     let r;
//     for(let ab= a*b;r = a % b;a = b, b = r){}
//     return [b, ab/b];
// }
