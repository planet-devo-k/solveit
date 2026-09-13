// RETRY
function solution(n) {
  const arr = new Array(n + 1).fill(true);
  arr[0] = arr[1] = false;
  let count = 0;

  for (let i = 2; i <= n; i++) {
    if (arr[i]) {
      count++;
      for (let j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }

  return count;
}
