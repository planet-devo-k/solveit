function solution(dot) {
  var answer = 0;
  if (dot[0] > 0) answer = dot[1] > 0 ? 1 : 4;
  else answer = dot[1] > 0 ? 2 : 3;

  return answer;
}

// 참고용
// function solution(dot) {
//     return dot[0] > 0 ? dot[1] > 0 ? 1 : 4 : dot[1] > 0 ? 2 : 3;
// }
