function solution(myString) {
  var answer = "";
  for (let char of myString) {
    if (char.charCodeAt(0) < "l".charCodeAt(0)) {
      answer += "l";
    } else {
      answer += char;
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
