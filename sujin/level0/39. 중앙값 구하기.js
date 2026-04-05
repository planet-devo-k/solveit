function solution(array) {
  const CENTER_IDX = Math.floor(array.length / 2);
  return array.sort((a, b) => a - b)[CENTER_IDX];
}
