function solution(order) {
  let result = 0;
  let s = String(order);

  for (const char of s) {
    const num = Number(char);
    // 0 제외
    if (num !== 0 && num % 3 === 0) {
      result++;
    }
  }
  return result;
}

// 다른 풀이
// function solution(order) {
//     return [...String(order)].filter(v => ['3', '6', '9'].includes(v)).length;
// }
