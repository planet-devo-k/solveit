function solution(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    const divisor_arr = [];
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        divisor_arr.push(j);
      }
    }
    divisor_arr.length % 2 === 0 ? (answer += i) : (answer -= i);
  }
  return answer;
}
