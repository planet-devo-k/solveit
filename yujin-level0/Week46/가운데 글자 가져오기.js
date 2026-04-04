function solution(s) {
  const mid = s.length / 2;
  return s.length % 2 === 0 ? s[mid - 1] + s[mid] : s[Math.floor(mid)];
}

// 다른 풀이
// function solution(s) {
//     const mid = Math.floor(s.length / 2);
//     // 짝수면 mid-1부터 mid+1까지(2글자), 홀수면 mid부터 mid+1까지(1글자)
//     return s.length % 2 !== 0 ? s.slice(mid, mid + 1) : s.slice(mid - 1, mid + 1);
// }
