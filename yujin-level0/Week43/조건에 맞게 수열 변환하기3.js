function solution(arr, k) {
  return k % 2 === 0 ? arr.map((a) => a + k) : arr.map((a) => a * k);
}

// 다른 풀이
// const solution = (arr, k) => arr.map(v => k % 2 ? v * k : v + k)
