function solution(my_string) {
  let answer = [];
  for (let i of my_string) {
    if (i.charCodeAt() < 58) answer.push(Number(i));
  }
  return answer.sort();
}

// 다른 풀이
// function solution(my_string) {
//   return [...my_string]
//     .filter((v) => !isNaN(v))
//     .map((v) => parseInt(v))
//     .sort();
// }
