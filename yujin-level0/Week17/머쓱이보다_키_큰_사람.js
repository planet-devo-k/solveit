function solution(array, height) {
  var answer = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > height) {
      answer++;
    }
  }
  return answer;
}

// 참고용
// function solution(array, height) {
//     var answer = array.filter(item => item > height);
//     return answer.length;
// }

// solution([1,2,3,4],2)
