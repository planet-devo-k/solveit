function solution(my_string, num1, num2) {
  const strToArr = my_string.split("");
  strToArr[num1] = my_string[num2];
  strToArr[num2] = my_string[num1];
  return strToArr.join("");
}
