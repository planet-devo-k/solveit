function solution(my_string, alp) {
  let answer = "";
  for (let a of my_string) {
    if (a === alp) {
      answer += a.toUpperCase();
    } else {
      answer += a;
    }
  }
  return answer;
}

// 다른 풀이
// function solution(my_string, alp) {
//     return my_string.replaceAll(alp, alp.toUpperCase());
// }
