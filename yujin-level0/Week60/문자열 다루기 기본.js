function solution(s) {
  if (s.length !== 4 && s.length !== 6) {
    return /^\d+$/.test(s);
  }
}

// 다른 풀이
// function alpha_string46(s) {
//    return s.length == 4 || s.length == 6 ? !isNaN(s) : false
// }
