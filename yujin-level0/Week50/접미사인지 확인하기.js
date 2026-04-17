function solution(my_string, is_suffix) {
  let strL = my_string.length;
  let sufL = is_suffix.length;
  return my_string.slice(strL - sufL) === is_suffix ? 1 : 0;
}

// 다른 풀이
// function solution(my_string, is_suffix) {
//   return Number(my_string.endsWith(is_suffix));
// }
