function solution(arr) {
  var answer = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (answer[answer.length - 1] !== arr[i]) {
      answer.push(arr[i]);
    }
  }

  return answer;
}

// 다른 풀이
// function solution(arr) {
//   return arr.filter((v, i) => v !== arr[i - 1]);
// }
