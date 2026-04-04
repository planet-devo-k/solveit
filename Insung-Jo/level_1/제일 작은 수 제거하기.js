function solution(arr) {
  const minVal = Math.min(...arr);

  return arr.length <= 1 ? [-1] : arr.filter((num) => num != minVal);
}
