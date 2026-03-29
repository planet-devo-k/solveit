function solution(numbers) {
  let answer = numbers.sort((a, b) => {
    return b - a;
  });
  return answer[0] * answer[1];
}

// 참고용
// function solution(numbers) {
//     numbers.sort((a,b)=>b-a);
//     return numbers[0]*numbers[1];
// }
