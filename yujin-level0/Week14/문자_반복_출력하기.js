function solution(my_string, n) {
  var answer = "";
  for (let i = 0; i < my_string.length; i++) answer += my_string[i].repeat(n);

  return answer;
}

// 참고용
// function solution(my_string, n) {
//   var answer = [...my_string].map((a) => a.repeat(n)).join("");
//   return answer;
// }
