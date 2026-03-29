function solution(my_string, num1, num2) {
  let answer = "";
  let str1 = my_string[num1];
  let str2 = my_string[num2];
  let splitArr = my_string.split("");

  splitArr[num1] = str2;
  splitArr[num2] = str1;

  return splitArr.join("");
}

// 다른 풀이
// function solution(my_string, num1, num2) {
//     my_string = my_string.split('');
//     [my_string[num1], my_string[num2]] = [my_string[num2], my_string[num1]];
//     return my_string.join('');
// }
