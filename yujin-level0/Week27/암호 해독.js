function solution(cipher, code) {
  let str = "";
  for (let i = code - 1; i < cipher.length; i += code) {
    str += cipher[i];
  }
  return str;
}

// 다른 풀이
// function solution(cipher, code) {
//     return cipher.split('').filter((_, index) => (index + 1) % code === 0).join('');
// }
