function solution(numbers, num1, num2) {
  let answer = [];
  answer = numbers.slice(num1, num2 + 1);
  return answer;
}

// 참고용
// function solution(numbers, num1, num2) {
//     return numbers.splice(num1, num2-num1+1);
// }
