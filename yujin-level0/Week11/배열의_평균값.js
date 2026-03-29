function solution(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

// 배열 메서드를 이용한 간단 풀이
// function solution(numbers) {
//     var answer = numbers.reduce((a,b) => a+b, 0) / numbers.length;
//     return answer;
// }
