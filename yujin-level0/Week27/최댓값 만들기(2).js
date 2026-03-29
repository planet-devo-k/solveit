function solution(numbers) {
  numbers.sort((a, b) => b - a);
  const firstTwo = numbers[0] * numbers[1];
  const lastTwo = numbers[numbers.length - 1] * numbers[numbers.length - 2];
  return firstTwo > lastTwo ? firstTwo : lastTwo;
}

// 참고
// function solution(numbers) {
//     var answer = [];
//     for(let i = 0; i < numbers.length - 1; i++){
//         for(let j = i + 1; j < numbers.length; j++){
//             answer.push(numbers[i] * numbers[j]);
//         }
//     }
//     return Math.max(...answer);
// }
