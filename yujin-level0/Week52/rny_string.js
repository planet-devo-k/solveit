function solution(rny_string) {
  let result = "";
  for (let i of rny_string) {
    result += i === "m" ? "rn" : i;
  }
  return result;
}

// 다른 풀이
// function solution(rny_string) {
//     return rny_string.replaceAll('m', 'rn');
// }
