function solution(arr) {
  return arr.flatMap((el) => Array(el).fill(el));
}
