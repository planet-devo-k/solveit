function solution(arr, divisor) {
  var answer = [];
  for (const a of arr) {
    if (a % divisor === 0) {
      answer.push(a);
    }
  }

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}
