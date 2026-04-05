function solution(arr, divisor) {
  let answer = [];
  for (let el of arr) {
    if (el % divisor === 0) {
      answer.push(el);
    }
  }
  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}
