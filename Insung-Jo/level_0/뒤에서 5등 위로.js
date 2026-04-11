function solution(num_list) {
  const SLICE_COUNT = 5;

  return num_list.sort((a, b) => a - b).slice(SLICE_COUNT);
}
