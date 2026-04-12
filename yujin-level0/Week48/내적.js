function solution(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}

// 다른 풀이
// array.reduce((누적값, 현재값, 인덱스, 원본배열) => { ... }, 초깃값)
function solution(a, b) {
  return a.reduce((acc, cur, i) => acc + cur * b[i], 0);
}
