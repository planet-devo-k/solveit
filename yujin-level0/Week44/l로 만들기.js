function solution(myString) {
  var answer = "";
  for (let a of myString) {
    if (a.charCodeAt(0) < "l".charCodeAt(0)) {
      answer += "l";
    } else {
      answer += a;
    }
  }
  return answer;
}

// 다른 풀이
// function solution(myString) {
//     return myString.split('').map(a => {
//         if (a.charCodeAt(0) < "l".charCodeAt(0)) {
//             a = 'l';
//         }
//         return a;
//     }).join('');
// }
