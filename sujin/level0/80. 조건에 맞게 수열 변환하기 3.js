function solution(arr, k) {
  return k % 2 !== 0 ? arr.map((item) => item * k) : arr.map((item) => item + k);
}
