function solution(arr) {
  return arr.length !== 1 ? arr.filter((item) => item !== Math.min(...arr)) : [-1];
}
