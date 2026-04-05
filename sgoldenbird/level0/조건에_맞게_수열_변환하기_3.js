function solution(arr, k) {
  for (let i = 0; i < arr.length; i++) {
    if (k % 2 !== 0) {
      arr[i] *= k;
    } else {
      arr[i] += k;
    }
  }
  return arr;
}
